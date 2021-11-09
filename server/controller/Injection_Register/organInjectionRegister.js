const OrganInjectionRegister = require("../../model/organ_injection_register");
const HealthOrganization = require("../../model/healthOrganization");
const InjectionRegister = require("../../model/injection_register");
const ScheduleInjection = require("../../model/schedule_injection");
const Wards = require("../../model/ward");
const Districts = require("../../model/district");
const Provinces = require("../../model/province");
const Vaccine = require("../../model/vaccine");
const Users = require("../../model/user");
const XLSX = require("xlsx");
const fs = require("fs");
const vaccine = require("../../model/vaccine");
const mongoose = require("mongoose");
const OrganInjectionRegisterCtrl = {
  registerInjection: async (req, res) => {
    try {
      var workbook = XLSX.readFile(req.file.path);
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      const old_key = [
        "STT",
        "Họ và Tên",
        "Giới tính",
        "Ngày sinh",
        "E-mail",
        "Nghề nghiệp",
        "Số điện thoại",
        "CMND/CCCD",
        "BHYT",
        "Tỉnh/Thành Phố",
        "Quận/Huyện",
        "Phường/Xã",
        "Ngày muốn tiêm",
        "Đăng ký mũi thứ",
        "Loại vắc xin",
        "Đơn vị tiêm",
      ];
      const new_key = [
        "STT",
        "name",
        "gender",
        "dob",
        "email",
        "job",
        "phonenumber",
        "identification",
        "bhyt",
        "province",
        "district",
        "ward",
        "injectionDate",
        "dose",
        "vaccine",
        "healthOrganization",
      ];
      xlData.forEach((item) => {
        for (let i = 0; i < new_key.length; i++) {
          Object.defineProperty(
            item,
            new_key[i],
            Object.getOwnPropertyDescriptor(item, old_key[i])
          );
          delete item[old_key[i]];
        }
      });
      removeTmp(req.file.path);
      let userPhoneArr = [];
      const vaccineIdReg = await Vaccine.findOne({
        name_vaccine: xlData[0].vaccine,
      });
      for (const [index, item] of xlData.entries()) {
        const user = await Users.findOne({
          phonenumber: item.phonenumber,
        });

        if (user) {
          if (user.doseInformation[0]) {
            if (user.doseInformation[0].vaccineId === vaccineIdReg._id) {
              userPhoneArr.push({
                phonenumber: user.phonenumber,
                dose: item.dose,
              });
            } else {
              return res.status(400).json({
                msg: `Đối tượng ${user.name} không đủ điều kiện tiêm vắc xin ${item.vaccine}`,
              });
            }
          } else {
            userPhoneArr.push({
              phonenumber: user.phonenumber,
              dose: item.dose,
            });
          }
        } else {
          userPhoneArr.push({ phonenumber: item.phonenumber, dose: item.dose });
          const province = await Provinces.findOne({ name: item.province });
          const district = await Districts.findOne({ name: item.district });
          const ward = await Wards.findOne({ name: item.ward });

          const newUser = new Users({
            phonenumber: item.phonenumber,
            identification: item.identification,
            name: item.name,
            gender: item.gender,
            dob: item.dob,
            province: {
              id: province.provinceId,
              name: province.name,
            },
            district: {
              id: district.districtId,
              name: district.name,
            },
            ward: {
              id: ward.wardId,
              name: ward.name,
            },
            address: item.address,
            email: item.email,
            bhyt: item.bhyt,
          });
          await newUser.save();
        }
      }
      const healthOrganization = await HealthOrganization.findOne({
        organization: xlData[0].healthOrganization,
      });
      const dataReturn = {
        organizationId: req.user.id,
        userPhone: userPhoneArr,
        healthOrganizationId: healthOrganization._id,
        vaccineId: vaccineIdReg._id,
        injectionDate: xlData[0].injectionDate,
      };
      const newData = new OrganInjectionRegister(dataReturn);
      await newData.save();
      res.json({ msg: "Đăng ký thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getListOrganRegister: async (req, res) => {
    try {
      if (req.query.vaccineId === "0") {
        OrganInjectionRegister.aggregate([
          {
            $match: {
              healthOrganizationId: mongoose.Types.ObjectId(req.user.id),
            },
          },
          {
            $addFields: {
              userPhone: { $ifNull: ["$userPhone", []] },
            },
          },
          {
            $lookup: {
              from: "healthorganizations",
              localField: "healthOrganizationId",
              foreignField: "_id",
              as: "healthOrganization",
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
            $lookup: {
              from: "organizations",
              localField: "organizationId",
              foreignField: "_id",
              as: "organization",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userPhone.phonenumber",
              foreignField: "phonenumber",
              as: "users",
            },
          },
          {
            $addFields: {
              userPhone: {
                $map: {
                  input: "$userPhone",
                  in: {
                    $mergeObjects: [
                      "$$this",
                      {
                        phonenumber: {
                          $arrayElemAt: [
                            "$users",
                            {
                              $indexOfArray: [
                                "$users.phonenumber",
                                "$$this.phonenumber",
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          { $project: { users: 0 } },
          {
            $sort: {
              injectionDate: 1,
            },
          },
          {
            $unwind: "$healthOrganization",
          },
          {
            $unwind: "$organization",
          },
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        OrganInjectionRegister.aggregate([
          {
            $match: {
              healthOrganizationId: mongoose.Types.ObjectId(req.user.id),
              vaccineId: parseInt(req.query.vaccineId),
            },
          },
          {
            $addFields: {
              userPhone: { $ifNull: ["$userPhone", []] },
            },
          },
          {
            $lookup: {
              from: "healthorganizations",
              localField: "healthOrganizationId",
              foreignField: "_id",
              as: "healthOrganization",
            },
          },
          {
            $lookup: {
              from: "organizations",
              localField: "organizationId",
              foreignField: "_id",
              as: "organization",
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
            $lookup: {
              from: "users",
              localField: "userPhone.phonenumber",
              foreignField: "phonenumber",
              as: "users",
            },
          },
          {
            $addFields: {
              userPhone: {
                $map: {
                  input: "$userPhone",
                  in: {
                    $mergeObjects: [
                      "$$this",
                      {
                        phonenumber: {
                          $arrayElemAt: [
                            "$users",
                            {
                              $indexOfArray: [
                                "$users.phonenumber",
                                "$$this.phonenumber",
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          { $project: { users: 0 } },
          {
            $sort: {
              injectionDate: 1,
            },
          },
          {
            $unwind: "$healthOrganization",
          },
          {
            $unwind: "$organization",
          },
          {
            $unwind: "$vaccine",
          },
        ])
          .then((result) => {
            res.json({ data: result });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getByIdOrgan: async (req, res) => {
    try {
      OrganInjectionRegister.aggregate([
        {
          $match: {
            organizationId: mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $addFields: {
            userPhone: { $ifNull: ["$userPhone", []] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userPhone.phonenumber",
            foreignField: "phonenumber",
            as: "users",
          },
        },
        {
          $addFields: {
            userPhone: {
              $map: {
                input: "$userPhone",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      phonenumber: {
                        $arrayElemAt: [
                          "$users",
                          {
                            $indexOfArray: [
                              "$users.phonenumber",
                              "$$this.phonenumber",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $project: { users: 0 } },
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

  getById: async (req, res) => {
    try {
      OrganInjectionRegister.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $addFields: {
            userPhone: { $ifNull: ["$userPhone", []] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userPhone.phonenumber",
            foreignField: "phonenumber",
            as: "users",
          },
        },
        {
          $addFields: {
            userPhone: {
              $map: {
                input: "$userPhone",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      phonenumber: {
                        $arrayElemAt: [
                          "$users",
                          {
                            $indexOfArray: [
                              "$users.phonenumber",
                              "$$this.phonenumber",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $project: { users: 0 } },
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
  deleteUserRegister: async (req, res) => {
    try {
      const listRegister = await OrganInjectionRegister.findOne({
        organizationId: req.user.id,
      });
      const newData = listRegister.userPhone.filter(
        (item) => item.phonenumber !== req.body.phonenumber
      );
      await OrganInjectionRegister.findOneAndUpdate(
        {
          organizationId: req.user.id,
        },
        { userPhone: newData }
      );
      OrganInjectionRegister.aggregate([
        {
          $match: {
            organizationId: mongoose.Types.ObjectId(req.user.id),
          },
        },
        {
          $addFields: {
            userPhone: { $ifNull: ["$userPhone", []] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userPhone.phonenumber",
            foreignField: "phonenumber",
            as: "users",
          },
        },
        {
          $addFields: {
            userPhone: {
              $map: {
                input: "$userPhone",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      phonenumber: {
                        $arrayElemAt: [
                          "$users",
                          {
                            $indexOfArray: [
                              "$users.phonenumber",
                              "$$this.phonenumber",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $project: { users: 0 } },
      ])
        .then((result) => {
          res.json({ data: result, msg: "Xoá thành công" });
        })
        .catch((error) => {
          return res.status(500).json({ msg: error.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  addUserRegister: async (req, res) => {
    try {
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
      const listRegister = await OrganInjectionRegister.findOne({
        organizationId: req.user.id,
      });
      const user1 = await Users.findOne({
        phonenumber: req.body.phonenumber,
      });
      if (!listRegister.userPhone.includes(req.body.phonenumber)) {
        await listRegister.updateOne({
          $push: {
            userPhone: {
              phonenumber: req.body.phonenumber,
              dose: user1.doseInformation.length + 1,
            },
          },
        });
      } else {
        return res
          .status(400)
          .json({ msg: "Người dân này đã có trong danh sách đăng ký" });
      }
      OrganInjectionRegister.aggregate([
        {
          $match: {
            organizationId: mongoose.Types.ObjectId(req.user.id),
          },
        },
        {
          $addFields: {
            userPhone: { $ifNull: ["$userPhone", []] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userPhone.phonenumber",
            foreignField: "phonenumber",
            as: "users",
          },
        },
        {
          $addFields: {
            userPhone: {
              $map: {
                input: "$userPhone",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      phonenumber: {
                        $arrayElemAt: [
                          "$users",
                          {
                            $indexOfArray: [
                              "$users.phonenumber",
                              "$$this.phonenumber",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $project: { users: 0 } },
      ])
        .then((result) => {
          res.json({ data: result, msg: "Thêm thành công" });
        })
        .catch((error) => {
          return res.status(500).json({ msg: error.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = OrganInjectionRegisterCtrl;
