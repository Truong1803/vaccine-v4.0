const Users = require("../../model/user");
const InjectionRegister = require("../../model/injection_register");
const ScheduleInjection = require("../../model/schedule_injection");
const mongoose = require("mongoose");
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
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const userCtrl = {
  getAll: async (req, res) => {
    try {
      const total = await Users.countDocuments({});
      const features = new APIfeature(Users.find(), req.query)
        .filtering()
        .paginating();
      const data = await features.query;
      return res.json({ data, total });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllUserInjected: async (req, res) => {
    try {
      let dataInjected = [];
      const data = await Users.find();

      data.forEach((item) => {
        if (Object.keys(item.doseInformation).length > 0) {
          dataInjected.push(item);
        }
      });
      if (req.query.injectionDate === "") {
        res.json({ data: dataInjected });
      } else {
        let dataFilter = [];
        dataInjected.forEach((item) => {
          item.doseInformation.forEach((item1) => {
            if (item1.injectionDate === req.query.injectionDate) {
              dataFilter.push(item);
            }
          });
        });
        res.json({ data: dataFilter });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.params.id });
      let data = [];
      data.push(user);
      return res.json({ data: data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * tạo mới tk người dân
   * @param {*}phonenumber,
   * @param {*}     identification,
   * @param {*}     name,
   * @param {*}     gender,
   * @param {*}     dob,
   * @param {*}     province,
   * @param {*}     district,
   * @param {*}     ward,
   * @param {*}     address,
   * @returns {message,newUser}
   */
  createUser: async (req, res) => {
    try {
      const {
        phonenumber,
        identification,
        name,
        gender,
        dob,
        province,
        district,
        ward,
        address,
      } = req.body;
      const user = await Users.findOne({ phonenumber, identification });
      if (user)
        return res.status(400).json("Sở ý tế quận huyện này đã tồn tại");
      const newUser = new Users({
        phonenumber,
        identification,
        name,
        gender,
        dob,
        province,
        district,
        ward,
        address,
      });
      newUser.save();
      return res.json({
        msg: "Tạo mới tài khoản người dân thành công",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * cập nhật tk người dân
   * @param {*} id
   * @param {*}phonenumber,
   * @param {*}     identification,
   * @param {*}     name,
   * @param {*}     gender,
   * @param {*}     dob,
   * @param {*}     province,
   * @param {*}     district,
   * @param {*}     ward,
   * @param {*}     address,
   * @returns {message,userUpdated}
   */

  updateUser: async (req, res) => {
    try {
      const {
        phonenumber,
        identification,
        name,
        gender,
        dob,
        province,
        district,
        ward,
        address,
        bhyt,
        job,
        company,
      } = req.body;
      const user = await Users.findByIdAndUpdate(
        { _id: req.body._id },
        {
          phonenumber,
          identification,
          name,
          gender,
          dob,
          province,
          district,
          ward,
          address,
          bhyt,
          job,
          company,
        },
        { new: true }
      );
      return res.json({ msg: "Cập nhật thành công", data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * xoá user
   * @param {*} id
   * @returns {message,userDeleted}
   */
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete({ _id: req.params.id });
      return res.json({ msg: "Xoá thành công một người dùng", data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateVaccinationRecord: async (req, res) => {
    try {
    } catch (error) {}
  },

  /**
   * tra cuu ket qua dang ky
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getResultInjectRegister: async (req, res) => {
    try {
      const result = await InjectionRegister.findOne({ userId: req.user.id });
      if (result) {
        InjectionRegister.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(req.user.id),
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
            $unwind: "$organization",
          },
        ])
          .then((result) => {
            res.json({ data: result[0] });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        const result = await ScheduleInjection.findOne({ userId: req.user.id });
        if (result) {
          ScheduleInjection.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(req.user.id),
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
              $unwind: "$organization",
            },
          ])
            .then((result) => {
              res.json({ data: result[0] });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        } else {
          return res.json({ data: "notFound" });
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateRecord: async (req, res) => {
    try {
      const data = req.body;
      const user = await Users.updateOne(
        { _id: req.params.id, "doseInformation.dose": 1 },
        { $set: { "doseInformation.$": data } },
        { new: true }
      );
      console.log(user);
      res.json({ msg: "Cập nhật hồ sơ tiêm chủng thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
