const InjectionRegister = require("../model/injection_register");
const ScheduleInjection = require("../model/schedule_injection");
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
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const UserInjectionRegisterCtrl = {
  getAllInjectionRegister: async (req, res) => {
    try {
      InjectionRegister.aggregate([
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
            injectionDate: 1,
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
          res.json({ data: result });
        })
        .catch((error) => {
          return res.status(500).json({ msg: error.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * lấy bản đăng ký theo Id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getInjectionRegister: async (req, res) => {
    try {
      const result = await InjectionRegister.findOne({ userId: req.params.id });
      if (!result)
        return res.json({ msg: "Tài khoản hiện chưa đăng ký tiêm chủng" });
      InjectionRegister.aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(req.params.id),
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
          $unwind: "$organization",
        },
        {
          $unwind: "$user",
        },
      ])
        .then((result) => {
          res.json({ data: result[0] });
        })
        .catch((error) => {
          return res.status(500).json({ msg: error.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  InjectionRegister: async (req, res) => {
    try {
      const {
        userId,
        healthOrganizationId,
        dose,
        injectionDate,
        vaccineId,
        diseaseId,
      } = req.body;
      if (
        userId === "" ||
        healthOrganizationId === "" ||
        dose === "" ||
        injectionDate === "" ||
        vaccineId === ""
      )
        return res
          .status(400)
          .json({ msg: "Bạn cần nhập đầy đủ các thông tin bắt buộc" });
      const data = await InjectionRegister.findOne({ userId });
      const data1 = await ScheduleInjection.findOne({ userId });
      if (data || data1)
        return res
          .status(400)
          .json({ msg: "Tài khoản đã đăng ký tiêm, vui lòng kiểm tra lại" });
      const newRegister = new InjectionRegister({
        userId,
        healthOrganizationId,
        dose: parseInt(dose),
        injectionDate,
        vaccineId: parseInt(vaccineId),
        diseaseId,
      });
      await newRegister.save();
      return res.json({ msg: "Đăng ký tiêm chủng thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteInjectionRegister: async (req, res) => {
    try {
      await InjectionRegister.findByIdAndDelete({ _id: req.params.id });
      return res.json({ msg: "Huỷ đăng ký tiêm thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = UserInjectionRegisterCtrl;
