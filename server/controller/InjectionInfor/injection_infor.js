const InjectionInfor = require("../../model/injection_infor");
const Users = require("../../model/user");
const mongoose = require("mongoose");
const InjectionInforCtrl = {
  getPreInjection: async (req, res) => {
    try {
      const total = await InjectionInfor.countDocuments({
        status: false,
        healthOrganizationId: req.user.id,
      });
      console.log(req.query.injectionDate === "");
      if (req.query.injectionDate === "") {
        InjectionInfor.aggregate([
          {
            $match: {
              status: false,
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
            $lookup: {
              from: "vaccines",
              localField: "vaccineId",
              foreignField: "_id",
              as: "vaccine",
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
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        InjectionInfor.aggregate([
          {
            $match: {
              status: false,
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
            $lookup: {
              from: "vaccines",
              localField: "vaccineId",
              foreignField: "_id",
              as: "vaccine",
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
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPostInjection: async (req, res) => {
    try {
      const total = await InjectionInfor.countDocuments({
        status: true,
        healthOrganizationId: req.user.id,
      });

      if (req.query.injectionDate === "") {
        InjectionInfor.aggregate([
          {
            $match: {
              status: true,
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
            $lookup: {
              from: "vaccines",
              localField: "vaccineId",
              foreignField: "_id",
              as: "vaccine",
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
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        InjectionInfor.aggregate([
          {
            $match: {
              status: true,
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
            $lookup: {
              from: "vaccines",
              localField: "vaccineId",
              foreignField: "_id",
              as: "vaccine",
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
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result, total });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updatePreInjection: async (req, res) => {
    try {
      const {
        temperature,
        bloodVessel,
        bloodPressure,
        breathing,
        injectorPreName,
        timePre,
      } = req.body;
      const result = await InjectionInfor.findByIdAndUpdate(
        { _id: req.params.id },
        {
          status: true,
          preInjectionReaction: {
            temperature: parseFloat(temperature),
            bloodVessel: parseInt(bloodVessel),
            bloodPressure,
            breathing: parseInt(breathing),
            injectorPreName,
            timePre,
          },
        },
        { new: true }
      );
      return res.json({
        msg: "Cập nhật hồ sơ trước tiêm thành công",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updatePostInjection: async (req, res) => {
    try {
      const { nameReact, injectorPostName, timePost } = req.body;
      const result = await InjectionInfor.findByIdAndUpdate(
        { _id: req.params.id },
        {
          postInjectionReaction: { nameReact, injectorPostName, timePost },
        },
        { new: true }
      );
      const {
        dose,
        injectionDate,
        vaccineId,
        diseaseId,
        time,
        healthOrganizationId,
        preInjectionReaction,
        postInjectionReaction,
      } = result;
      const user = await Users.findById({ _id: result.userId });
      await user.updateOne({
        $push: {
          doseInformation: {
            dose,
            injectionDate,
            vaccineId,
            diseaseId,
            time,
            healthOrganizationId,
            preInjectionReaction,
            postInjectionReaction,
          },
        },
      });
      await InjectionInfor.findByIdAndDelete({
        _id: req.params.id,
      });
      return res.json({
        msg: "Cập nhật hồ sơ sau tiêm thành công",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = InjectionInforCtrl;
