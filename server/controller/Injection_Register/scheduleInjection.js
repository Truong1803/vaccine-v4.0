const ScheduleInjection = require("../../model/schedule_injection");
const sms = require("../../config/sendSMS");
const Users = require("../../model/user");
const InjectionRegister = require("../../model/injection_register");
const InjectionRegisterOrgan = require("../../model/organ_injection_register");
const InjectionInfor = require("../../model/injection_infor");
const Organization = require("../../model/organization");
const sendScheduleOrgan = require("../../config/sendEmailScheduleOrgan");
const mongoose = require("mongoose");
const HealthOrganization = require("../../model/healthOrganization");
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
  getAll: async (req, res) => {
    try {
      const total = await ScheduleInjection.countDocuments({
        healthOrganizationId: req.user.id,
      });
      if (req.query.injectionDate === "") {
        ScheduleInjection.aggregate([
          {
            $match: {
              healthOrganizationId: mongoose.Types.ObjectId(req.user.id),
            },
          },
          {
            $lookup: {
              from: "healthorganizations",
              localField: "healthOrganizationId",
              foreignField: "_id",
              as: "organization",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $sort: {
              injectionDate: -1,
            },
          },
          {
            $unwind: "$organization",
          },
          {
            $unwind: "$user",
          },
        ])
          .then((result) => {
            let dataSet = new Set();
            result.forEach((item) => {
              dataSet.add(item.injectionDate);
            });
            let array = Array.from(dataSet);
            let resultArray = [];
            let dataArr = [];
            while (result.length !== 0) {
              if (
                result[result.length - 1].injectionDate ===
                array[array.length - 1]
              ) {
                dataArr.push(result.pop());
                if (result.length === 0) {
                  dataArr.sort((a, b) => {
                    return -1;
                  });
                  resultArray.push(dataArr);
                }
              } else {
                array.pop();
                dataArr.sort((a, b) => {
                  return -1;
                });
                resultArray.push(dataArr);
                dataArr = [];
                dataArr.push(result.pop());
                if (result.length === 0) {
                  dataArr.sort((a, b) => {
                    return -1;
                  });
                  resultArray.push(dataArr);
                }
              }
            }
            res.json({ data: resultArray, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        ScheduleInjection.aggregate([
          {
            $match: {
              healthOrganizationId: mongoose.Types.ObjectId(req.user.id),
              injectionDate: req.query.injectionDate,
            },
          },
          {
            $lookup: {
              from: "healthorganizations",
              localField: "healthOrganizationId",
              foreignField: "_id",
              as: "organization",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $sort: {
              injectionDate: -1,
            },
          },
          {
            $unwind: "$organization",
          },
          {
            $unwind: "$user",
          },
        ])
          .then((result) => {
            let dataSet = new Set();
            result.forEach((item) => {
              dataSet.add(item.injectionDate);
            });
            let array = Array.from(dataSet);
            let resultArray = [];
            let dataArr = [];
            while (result.length !== 0) {
              if (
                result[result.length - 1].injectionDate ===
                array[array.length - 1]
              ) {
                dataArr.push(result.pop());
                if (result.length === 0) {
                  dataArr.sort((a, b) => {
                    return -1;
                  });
                  resultArray.push(dataArr);
                }
              } else {
                array.pop();
                dataArr.sort((a, b) => {
                  return -1;
                });
                resultArray.push(dataArr);
                dataArr = [];
                dataArr.push(result.pop());
                if (result.length === 0) {
                  dataArr.sort((a, b) => {
                    return -1;
                  });
                  resultArray.push(dataArr);
                }
              }
            }
            res.json({ data: resultArray, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  setScheduleInjection: async (req, res) => {
    try {
      const data = req.body;
      const organ = await HealthOrganization.findById(
        data[0].healthOrganizationId
      );
      const num_table = parseInt(organ.num_table);
      let timeCount = 0;
      let timeMorning = 25200; // 7h sáng
      let timeAfternoon = 46800; // 13h chiều
      const limitMorning = ((4 * 60) / 5) * num_table;
      const limitAfternoon = ((5 * 60) / 5) * num_table;
      if (data[0].time === "Sáng") {
        if (data.length > limitMorning) {
          return res.status(400).json({
            msg: `Số lượng người tiêm không đượt vượt quá ${limitMorning}`,
          });
        }
        timeCount = timeMorning;
      } else {
        if (data.length > limitAfternoon) {
          return res.status(400).json({
            msg: `Số lượng người tiêm không đượt vượt quá ${limitAfternoon}`,
          });
        }
        timeCount = timeAfternoon;
      }
      //  data.forEach(async (item, index)
      for (const [index, item] of data.entries()) {
        const timeStart = convertHMS(timeCount);

        const newData = await new ScheduleInjection({
          ...item,
          time: timeStart,
        });
        await newData.save();
        const user = await Users.findById({ _id: newData.userId });

        sms.sendSMS(user.phonenumber);
        const history = await InjectionRegister.findOneAndDelete({
          userId: newData.userId,
        });
        if (history) {
          const { userId, healthOrganizationId, dose, vaccineId, diseaseId } =
            history;
          const newInjectionInfor = await new InjectionInfor({
            userId,
            healthOrganizationId,
            dose,
            vaccineId,
            injectionDate: newData.injectionDate,
            time: timeStart,
            diseaseId,
          });
          await newInjectionInfor.save();
        } else {
          const history = await InjectionRegisterOrgan.findOneAndDelete({
            organizationId: item.organizationId,
          });
          const newInjectionInfor = await new InjectionInfor({
            userId: item.userId,
            healthOrganizationId: item.healthOrganizationId,
            dose: item.dose,
            vaccineId: item.vaccineId,
            injectionDate: newData.injectionDate,
            time: timeStart,
          });
          await newInjectionInfor.save();
        }

        if ((index + 1) % num_table === 0) {
          timeCount = timeCount + 300;
        }
      }
      if (data[0].organizationId) {
        const timeSend = data[0].time === "Sáng" ? "7h:00" : "13h00";
        const company = await Organization.findById({
          _id: data[0].organizationId,
        });
        sendScheduleOrgan(
          company.email,
          data[0].injectionDate,
          timeSend,
          organ.organization
        );
      }
      return res.json({ msg: "Thiết lập kế hoạch tiêm thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  importUserRegister: async (req, res) => {
    try {
      const { phonenumber, injectionDate, vaccineId } = req.body;
      const user = await Users.findOne({
        phonenumber: req.body.phonenumber,
      });
      if (user) {
        const checkRegis = await InjectionRegister.findOne({
          userId: user._id,
        });
        const checkSche = await ScheduleInjection.findOne({ userId: user._id });
        if (checkRegis || checkSche) {
          return res
            .status(400)
            .json({ msg: "Người dùng này đang đăng ký tiêm tại nơi khác" });
        }
      } else {
        const {
          phonenumber,
          identification,
          name,
          gender,
          dob,
          email,
          province,
          district,
          ward,
          address,
          bhyt,
          job,
          company,
          role,
        } = req.body;
        const newUser = new Users({
          phonenumber,
          identification,
          name,
          gender,
          dob,
          email,
          province,
          district,
          ward,
          address,
          bhyt,
          job,
          company,
          role,
        });
        await newUser.save();
      }
      const newUser = await Users.findOne({ phonenumber });
      const newRegister = await new InjectionRegister({
        userId: newUser._id,
        healthOrganizationId: req.user.id,
        dose: newUser.doseInformation.length + 1,
        injectionDate,
        vaccineId: parseInt(vaccineId),
      });
      await newRegister.save();
      return res.json({ msg: "Đăng ký tiêm chủng thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes;
}
module.exports = ScheduleInjectionCtrl;
