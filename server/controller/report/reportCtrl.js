const InjectionRegister = require("../../model/injection_register");
const InjectionRegisterOrgan = require("../../model/organ_injection_register");
const Users = require("../../model/user");
const mongoose = require("mongoose");
const HealthOrganization = require("../../model/healthOrganization");
const Provinces = require("../../model/province");
const Vaccines = require("../../model/vaccine");
const reportCtrl = {
  getTopData: async (req, res) => {
    try {
      const number_user_injection = await InjectionRegister.countDocuments({});
      const organ_injection = await InjectionRegisterOrgan.find();
      const user = await Users.find();
      let countInjected = 0;
      let countSideEffect = 0;
      user.forEach((item) => {
        if (Object.keys(item.doseInformation).length !== 0) {
          countInjected =
            countInjected + Object.keys(item.doseInformation).length;
          item.doseInformation.forEach((i) => {
            if (i.postInjectionReaction !== "616cead53786b07c28376cdb")
              countSideEffect = countSideEffect + 1;
          });
        }
      });
      let countInjection = 0;
      organ_injection.forEach((item) => {
        countInjection = countInjection + Object.keys(item.userPhone).length;
      });
      countInjection = countInjection + number_user_injection + countInjected;
      const data = {
        number_injection: countInjection,
        number_injected: countInjected,
        ratio_injection: ((countInjected / countInjection) * 100).toFixed(2),
        ratio_sideEffect: ((countSideEffect / countInjected) * 100).toFixed(2),
      };
      res.json({ data: data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataInjectionOrgan: async (req, res) => {
    try {
      const { provinceId, startDate, endDate } = req.query;
      let healthOrganizations = [];
      const vaccine = await Vaccines.find();

      if (provinceId === "") {
        const result = await HealthOrganization.find({ role: 3 });
        result.forEach((item) => {
          healthOrganizations.push({
            healthOrganizationId: item._id,
            name: item.organization,
          });
        });
      } else {
        const province = await Provinces.findOne({
          provinceId: parseInt(provinceId),
        });
        const result = await HealthOrganization.find({
          province: { id: province.provinceId, name: province.name },
          role: 3,
        });
        result.forEach((item) => {
          healthOrganizations.push({
            healthOrganizationId: item._id,
            name: item.organization,
          });
        });
      }
      if (startDate === "" && endDate === "") {
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                doseInformation: {
                  $filter: {
                    input: "$doseInformation",
                    as: "doseInformation",
                    cond: {
                      $eq: [
                        "$$doseInformation.healthOrganizationId",
                        // mongoose.Types.ObjectId(item.healthOrganizationId),
                        item.healthOrganizationId,
                      ],
                    },
                  },
                },
              },
            },
          ])
            .then((result) => {
              let listVaccine = [];
              for (const item of vaccine) {
                listVaccine.push({
                  _id: item._id,
                  name_vaccine: item.name_vaccine,
                  quanlity: 0,
                });
              }
              let listUser = [];
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                  });
                }
              }
              let sum = 0;
              for (const i of listVaccine) {
                sum = sum + i.quanlity;
              }
              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                vaccine: listVaccine,
                total: sum,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate !== "" && endDate === "") {
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                doseInformation: {
                  $filter: {
                    input: "$doseInformation",
                    as: "doseInformation",
                    cond: {
                      $and: [
                        {
                          $eq: [
                            "$$doseInformation.healthOrganizationId",
                            // mongoose.Types.ObjectId(item.healthOrganizationId),
                            item.healthOrganizationId,
                          ],
                        },
                        {
                          $gte: ["$$doseInformation.injectionDate", startDate],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ])
            .then((result) => {
              let listVaccine = [];
              for (const item of vaccine) {
                listVaccine.push({
                  _id: item._id,
                  name_vaccine: item.name_vaccine,
                  quanlity: 0,
                });
              }
              let listUser = [];
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                  });
                }
              }
              let sum = 0;
              for (const i of listVaccine) {
                sum = sum + i.quanlity;
              }
              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                vaccine: listVaccine,
                total: sum,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate === "" && endDate !== "") {
        console.log(endDate);
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                doseInformation: {
                  $filter: {
                    input: "$doseInformation",
                    as: "doseInformation",
                    cond: {
                      $and: [
                        {
                          $eq: [
                            "$$doseInformation.healthOrganizationId",
                            // mongoose.Types.ObjectId(item.healthOrganizationId),
                            item.healthOrganizationId,
                          ],
                        },
                        {
                          $lte: ["$$doseInformation.injectionDate", endDate],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ])
            .then((result) => {
              let listVaccine = [];
              for (const item of vaccine) {
                listVaccine.push({
                  _id: item._id,
                  name_vaccine: item.name_vaccine,
                  quanlity: 0,
                });
              }
              let listUser = [];
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                  });
                }
              }
              let sum = 0;
              for (const i of listVaccine) {
                sum = sum + i.quanlity;
              }
              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                vaccine: listVaccine,
                total: sum,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate !== "" && endDate !== "") {
        console.log(endDate);
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                doseInformation: {
                  $filter: {
                    input: "$doseInformation",
                    as: "doseInformation",
                    cond: {
                      $and: [
                        {
                          $eq: [
                            "$$doseInformation.healthOrganizationId",
                            // mongoose.Types.ObjectId(item.healthOrganizationId),
                            item.healthOrganizationId,
                          ],
                        },
                        {
                          $lte: ["$$doseInformation.injectionDate", endDate],
                        },
                        {
                          $gte: ["$$doseInformation.injectionDate", startDate],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ])
            .then((result) => {
              let listVaccine = [];
              for (const item of vaccine) {
                listVaccine.push({
                  _id: item._id,
                  name_vaccine: item.name_vaccine,
                  quanlity: 0,
                });
              }
              let listUser = [];
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                  });
                }
              }
              let sum = 0;
              for (const i of listVaccine) {
                sum = sum + i.quanlity;
              }
              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                vaccine: listVaccine,
                total: sum,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      }
      ////////////
      // console.log(startDate);
      // Users.aggregate([
      //   {
      //     $project: {
      //       doseInformation: {
      //         $filter: {
      //           input: "$doseInformation",
      //           as: "doseInformation",
      //           cond: {
      //             $and: [
      //               { $gte: ["$$doseInformation.injectionDate", startDate] },
      //               {
      //                 $eq: [
      //                   "$$doseInformation.healthOrganizationId",
      //                   mongoose.Types.ObjectId("615b06534d567f0915c0d2c5"),
      //                 ],
      //               },
      //             ],
      //           },
      //         },
      //       },
      //     },
      //   },
      // ])
      //   .then((result) => {
      //     res.json({ result });
      //   })
      //   .catch((error) => {
      //     return res.status(500).json({ msg: error.message });
      //   });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = reportCtrl;
