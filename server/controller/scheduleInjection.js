const ScheduleInjection = require("../model/schedule_injection");
const sms = require("../config/sendSMS");
const Users = require("../model/user");
const InjectionRegister = require("../model/injection_register");
const InjectionInfor = require("../model/injection_infor");
const { findByIdAndUpdate } = require("../model/schedule_injection");

const HealthOrganization = require("../model/healthOrganization");
class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    //console.log(queryStr);
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const ScheduleInjectionCtrl = {
  getByDate: async (req, res) => {
    try {
      const total = await ScheduleInjection.countDocuments({});
      const features = new APIfeature(
        ScheduleInjection.find({ injectionDate: req.params.injectionDate }),
        req.query
      ).paginating();
      const data = await features.query;
      return res.json({ data, total });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  setScheduleInjection: async (req, res) => {
    const data = req.body;
    const organ = await HealthOrganization.findById(
      data[0].healthOrganizationId
    );
    const num_table = parseInt(organ.num_table);
    let time = 0;
    let timeMorning = 28800; // 8h sáng
    let timeAfternoon = 46800; // 13h chiều
    if (data[0].time === "Sáng") {
      time = timeMorning;
    } else {
      time = timeAfternoon;
    }
    try {
      data.map(async (item, index) => {
        console.log(item);
        const timeStart = convertHMS(time);
        const newData = new ScheduleInjection({ ...item, time: timeStart });
        await newData.save();
        const user = await Users.findById({ _id: newData.userId });

        // sms.sendSMS(user.phonenumber);
        const history = await InjectionRegister.findOneAndDelete({
          userId: newData.userId,
        });
        const { userId, healthOrganizationId, dose, vaccineId, diseaseId } =
          history;
        const newInjectionInfor = new InjectionInfor({
          userId,
          healthOrganizationId,
          dose,
          vaccineId,
          diseaseId,
          injectionDate: newData.injectionDate,
          time: timeStart,
        });
        await newInjectionInfor.save();
        if ((index + 1) % num_table === 0) {
          time = time + 300;
        }
      });
      return res.json({ msg: "Thiết lập kế hoạch tiêm thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes; // Return is HH : MM : SS
}
module.exports = ScheduleInjectionCtrl;
