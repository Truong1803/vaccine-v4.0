const InjectionRegister = require("../../model/injection_register");
const InjectionRegisterOrgan = require("../../model/organ_injection_register");
const ScheduleInjection = require("../../model/schedule_injection");
const Users = require("../../model/user");
const mongoose = require("mongoose");
const HealthOrganization = require("../../model/healthOrganization");
const Provinces = require("../../model/province");
const Vaccines = require("../../model/vaccine");
const reportCtrl = {
  getTopData: async (req, res) => {
    try {
      const number_user_injection = await InjectionRegister.countDocuments({});
      const sche = await ScheduleInjection.countDocuments({});
      const organ_injection = await InjectionRegisterOrgan.find();
      const user = await Users.find();
      let countInjected = 0;
      let countSideEffect = 0;
      user.forEach((item) => {
        if (Object.keys(item.doseInformation).length !== 0) {
          countInjected =
            countInjected + Object.keys(item.doseInformation).length;
          item.doseInformation.forEach((i) => {
            if (
              i.postInjectionReaction.nameReact !== "616cead53786b07c28376cdb"
            )
              countSideEffect = countSideEffect + 1;
          });
        }
      });
      let countInjection = 0;
      organ_injection.forEach((item) => {
        countInjection = countInjection + Object.keys(item.userPhone).length;
      });
      countInjection =
        countInjection + number_user_injection + countInjected + sche;
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

  getDataInjectionOrganChart: async (req, res) => {
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

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                }
              }
              let vaccinceObj = {};
              for (const vac of listVaccine) {
                vaccinceObj = {
                  ...vaccinceObj,
                  [vac.name_vaccine]: vac.quanlity,
                };
              }
              resultFinal.push({
                name: item.name,
                ...vaccinceObj,
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

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                }
              }
              let vaccinceObj = {};
              for (const vac of listVaccine) {
                vaccinceObj = {
                  ...vaccinceObj,
                  [vac.name_vaccine]: vac.quanlity,
                };
              }
              resultFinal.push({
                name: item.name,
                ...vaccinceObj,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate === "" && endDate !== "") {
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

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                }
              }
              let vaccinceObj = {};
              for (const vac of listVaccine) {
                vaccinceObj = {
                  ...vaccinceObj,
                  [vac.name_vaccine]: vac.quanlity,
                };
              }
              resultFinal.push({
                name: item.name,
                ...vaccinceObj,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate !== "" && endDate !== "") {
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

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    for (const v of listVaccine) {
                      if (kq.vaccineId === v._id) {
                        v.quanlity = v.quanlity + 1;
                      }
                    }
                  }
                }
              }
              let vaccinceObj = {};
              for (const vac of listVaccine) {
                vaccinceObj = {
                  ...vaccinceObj,
                  [vac.name_vaccine]: vac.quanlity,
                };
              }
              resultFinal.push({
                name: item.name,
                ...vaccinceObj,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDateInjectionWithAge: async (req, res) => {
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
              let listUser = [];
              let agelt18 = 0;
              let agegte18 = 0;
              let agegte60 = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  if (getAge(re.dob) < 18) {
                    agelt18 = agelt18 + Object.keys(re.doseInformation).length;
                  } else if (getAge(re.dob) >= 18 && getAge(re.dob) < 60) {
                    agegte18 =
                      agegte18 + Object.keys(re.doseInformation).length;
                  } else {
                    agegte60 =
                      agegte60 + Object.keys(re.doseInformation).length;
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    doseInformation: re.doseInformation,
                  });
                }
              }

              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                agelt18,
                agegte18,
                agegte60,
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
              let listUser = [];
              let agelt18 = 0;
              let agegte18 = 0;
              let agegte60 = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  if (getAge(re.dob) < 18) {
                    agelt18 = agelt18 + Object.keys(re.doseInformation).length;
                  } else if (getAge(re.dob) >= 18 && getAge(re.dob) < 60) {
                    agegte18 =
                      agegte18 + Object.keys(re.doseInformation).length;
                  } else {
                    agegte60 =
                      agegte60 + Object.keys(re.doseInformation).length;
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    doseInformation: re.doseInformation,
                  });
                }
              }

              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                agelt18,
                agegte18,
                agegte60,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate === "" && endDate !== "") {
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
              let listUser = [];
              let agelt18 = 0;
              let agegte18 = 0;
              let agegte60 = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  if (getAge(re.dob) < 18) {
                    agelt18 = agelt18 + Object.keys(re.doseInformation).length;
                  } else if (getAge(re.dob) >= 18 && getAge(re.dob) < 60) {
                    agegte18 =
                      agegte18 + Object.keys(re.doseInformation).length;
                  } else {
                    agegte60 =
                      agegte60 + Object.keys(re.doseInformation).length;
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    doseInformation: re.doseInformation,
                  });
                }
              }

              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                agelt18,
                agegte18,
                agegte60,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      } else if (startDate !== "" && endDate !== "") {
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
              let listUser = [];
              let agelt18 = 0;
              let agegte18 = 0;
              let agegte60 = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  if (getAge(re.dob) < 18) {
                    agelt18 = agelt18 + Object.keys(re.doseInformation).length;
                  } else if (getAge(re.dob) >= 18 && getAge(re.dob) < 60) {
                    agegte18 =
                      agegte18 + Object.keys(re.doseInformation).length;
                  } else {
                    agegte60 =
                      agegte60 + Object.keys(re.doseInformation).length;
                  }
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    doseInformation: re.doseInformation,
                  });
                }
              }

              resultFinal.push({
                healthOrganization: {
                  _id: item.healthOrganizationId,
                  name: item.name,
                },
                user: listUser,
                agelt18,
                agegte18,
                agegte60,
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }

        res.json({ data: resultFinal });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getDateInjectionForWard: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      let endDate1 = "";
      if (endDate === "") {
        endDate1 = "2999-10-11";
      } else {
        endDate1 = endDate;
      }
      const user_injection = await InjectionRegister.find({
        healthOrganizationId: req.user.id,
        injectionDate: { $gte: startDate, $lte: endDate1 },
      });
      let num_user_injectionNam = 0;
      let num_user_injectionNu = 0;
      for (const item of user_injection) {
        const userGender = await Users.findById({ _id: item.userId });
        if (userGender.gender === "Nam") {
          num_user_injectionNam = num_user_injectionNam + 1;
        } else {
          num_user_injectionNu = num_user_injectionNu + 1;
        }
      }
      const organ_injection = await InjectionRegisterOrgan.find({
        healthOrganizationId: req.user.id,
        injectionDate: { $gte: startDate, $lte: endDate1 },
      });
      for (const item of organ_injection) {
        for (const u of item.userPhone) {
          const userGender = await Users.findOne({
            phonenumber: u.phonenumber,
          });
          if (userGender.gender === "Nam") {
            num_user_injectionNam = num_user_injectionNam + 1;
          } else {
            num_user_injectionNu = num_user_injectionNu + 1;
          }
        }
      }
      let healthOrganizations = [];

      const result = await HealthOrganization.findById({ _id: req.user.id });

      healthOrganizations.push({
        healthOrganizationId: result._id,
        name: result.organization,
      });

      if (startDate === "" && endDate === "") {
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
              let listUserNam = [];
              let listUserNu = [];
              let countInjectedNam = 0;
              let countSideEffectNam = 0;
              let countInjectedNu = 0;
              let countSideEffectNu = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nam"
                    ) {
                      countSideEffectNam = countSideEffectNam + 1;
                    } else if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nữ"
                    ) {
                      countSideEffectNu = countSideEffectNu + 1;
                    }
                  }
                  if (re.gender === "Nam") {
                    countInjectedNam =
                      countInjectedNam + Object.keys(re.doseInformation).length;
                    listUserNam.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  } else if (re.gender === "Nữ") {
                    countInjectedNu =
                      countInjectedNu + Object.keys(re.doseInformation).length;
                    listUserNu.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
              }

              res.json({
                data: {
                  userNam: listUserNam,
                  userNu: listUserNu,
                  Nam: {
                    num_user_injectionNam:
                      num_user_injectionNam + countInjectedNam,
                    countInjectedNam,
                    countSideEffectNam,
                  },
                  Nu: {
                    num_user_injectionNu:
                      num_user_injectionNu + countInjectedNu,
                    countInjectedNu,
                    countSideEffectNu,
                  },
                },
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
      } else if (startDate !== "" && endDate === "") {
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
              let listUserNam = [];
              let listUserNu = [];
              let countInjectedNam = 0;
              let countSideEffectNam = 0;
              let countInjectedNu = 0;
              let countSideEffectNu = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nam"
                    ) {
                      countSideEffectNam = countSideEffectNam + 1;
                    } else if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nữ"
                    ) {
                      countSideEffectNu = countSideEffectNu + 1;
                    }
                  }
                  if (re.gender === "Nam") {
                    countInjectedNam =
                      countInjectedNam + Object.keys(re.doseInformation).length;
                    listUserNam.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  } else if (re.gender === "Nữ") {
                    countInjectedNu =
                      countInjectedNu + Object.keys(re.doseInformation).length;
                    listUserNu.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
              }

              res.json({
                data: {
                  userNam: listUserNam,
                  userNu: listUserNu,
                  Nam: {
                    num_user_injectionNam:
                      num_user_injectionNam + countInjectedNam,
                    countInjectedNam,
                    countSideEffectNam,
                  },
                  Nu: {
                    num_user_injectionNu:
                      num_user_injectionNu + countInjectedNu,
                    countInjectedNu,
                    countSideEffectNu,
                  },
                },
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
      } else if (startDate === "" && endDate !== "") {
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
              let listUserNam = [];
              let listUserNu = [];
              let countInjectedNam = 0;
              let countSideEffectNam = 0;
              let countInjectedNu = 0;
              let countSideEffectNu = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nam"
                    ) {
                      countSideEffectNam = countSideEffectNam + 1;
                    } else if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nữ"
                    ) {
                      countSideEffectNu = countSideEffectNu + 1;
                    }
                  }
                  if (re.gender === "Nam") {
                    countInjectedNam =
                      countInjectedNam + Object.keys(re.doseInformation).length;
                    listUserNam.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  } else if (re.gender === "Nữ") {
                    countInjectedNu =
                      countInjectedNu + Object.keys(re.doseInformation).length;
                    listUserNu.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
              }

              res.json({
                data: {
                  userNam: listUserNam,
                  userNu: listUserNu,
                  Nam: {
                    num_user_injectionNam:
                      num_user_injectionNam + countInjectedNam,
                    countInjectedNam,
                    countSideEffectNam,
                  },
                  Nu: {
                    num_user_injectionNu:
                      num_user_injectionNu + countInjectedNu,
                    countInjectedNu,
                    countSideEffectNu,
                  },
                },
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
      } else if (startDate !== "" && endDate !== "") {
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
              let listUserNam = [];
              let listUserNu = [];
              let countInjectedNam = 0;
              let countSideEffectNam = 0;
              let countInjectedNu = 0;
              let countSideEffectNu = 0;
              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nam"
                    ) {
                      countSideEffectNam = countSideEffectNam + 1;
                    } else if (
                      kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb" &&
                      re.gender === "Nữ"
                    ) {
                      countSideEffectNu = countSideEffectNu + 1;
                    }
                  }
                  if (re.gender === "Nam") {
                    countInjectedNam =
                      countInjectedNam + Object.keys(re.doseInformation).length;
                    listUserNam.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  } else if (re.gender === "Nữ") {
                    countInjectedNu =
                      countInjectedNu + Object.keys(re.doseInformation).length;
                    listUserNu.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
              }

              res.json({
                data: {
                  userNam: listUserNam,
                  userNu: listUserNu,
                  Nam: {
                    num_user_injectionNam:
                      num_user_injectionNam + countInjectedNam,
                    countInjectedNam,
                    countSideEffectNam,
                  },
                  Nu: {
                    num_user_injectionNu:
                      num_user_injectionNu + countInjectedNu,
                    countInjectedNu,
                    countSideEffectNu,
                  },
                },
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDateInjectionForDistrict: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      let healthOrganizations = [];

      const result = await HealthOrganization.findById({ _id: req.user.id });
      const listOrgan = await HealthOrganization.find({
        district: result.district,
        role: 3,
      });
      listOrgan.forEach((item) => {
        healthOrganizations.push({
          healthOrganizationId: item._id,
          name: item.organization,
        });
      });
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
                gender: 1,
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
            .then(async (result) => {
              let listUser = [];
              let countInjected = 0;
              let countSideEffect = 0;
              const num_user_injection = await InjectionRegister.countDocuments(
                {
                  healthOrganizationId: item.healthOrganizationId,
                }
              );

              const organ_injection = await InjectionRegisterOrgan.find({
                healthOrganizationId: item.healthOrganizationId,
              });
              let countInjection = 0;
              for (const item of organ_injection) {
                countInjection =
                  countInjection + Object.keys(item.userPhone).length;
              }

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                      "616cead53786b07c28376cdb"
                    ) {
                      countSideEffect = countSideEffect + 1;
                    }
                  }

                  countInjected =
                    countInjected + Object.keys(re.doseInformation).length;
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    gender: re.gender,
                  });
                }
              }
              countInjection =
                countInjection + num_user_injection + countInjected;
              resultFinal.push({
                healthOrganization: item,
                user: listUser,
                countInjection,
                countInjected,
                countSideEffect,
                ratio_injection:
                  countInjection === 0
                    ? "0.00"
                    : ((countInjected / countInjection) * 100).toFixed(2),
                ratio_sideEffect:
                  countInjected === 0
                    ? "0.00"
                    : ((countSideEffect / countInjected) * 100).toFixed(2),
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
        res.json({
          data: resultFinal,
        });
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
                gender: 1,
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
            .then(async (result) => {
              let listUser = [];
              let countInjected = 0;
              let countSideEffect = 0;
              const num_user_injection = await InjectionRegister.countDocuments(
                {
                  healthOrganizationId: item.healthOrganizationId,
                }
              );

              const organ_injection = await InjectionRegisterOrgan.find({
                healthOrganizationId: item.healthOrganizationId,
              });
              let countInjection = 0;
              for (const item of organ_injection) {
                countInjection =
                  countInjection + Object.keys(item.userPhone).length;
              }

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                      "616cead53786b07c28376cdb"
                    ) {
                      countSideEffect = countSideEffect + 1;
                    }
                  }

                  countInjected =
                    countInjected + Object.keys(re.doseInformation).length;
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    gender: re.gender,
                  });
                }
              }
              countInjection =
                countInjection + num_user_injection + countInjected;
              resultFinal.push({
                healthOrganization: item,
                user: listUser,
                countInjection,
                countInjected,
                countSideEffect,
                ratio_injection:
                  countInjection === 0
                    ? "0.00"
                    : ((countInjected / countInjection) * 100).toFixed(2),
                ratio_sideEffect:
                  countInjected === 0
                    ? "0.00"
                    : ((countSideEffect / countInjected) * 100).toFixed(2),
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
        res.json({
          data: resultFinal,
        });
      } else if (startDate === "" && endDate !== "") {
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
            .then(async (result) => {
              let listUser = [];
              let countInjected = 0;
              let countSideEffect = 0;
              const num_user_injection = await InjectionRegister.countDocuments(
                {
                  healthOrganizationId: item.healthOrganizationId,
                }
              );

              const organ_injection = await InjectionRegisterOrgan.find({
                healthOrganizationId: item.healthOrganizationId,
              });
              let countInjection = 0;
              for (const item of organ_injection) {
                countInjection =
                  countInjection + Object.keys(item.userPhone).length;
              }

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                      "616cead53786b07c28376cdb"
                    ) {
                      countSideEffect = countSideEffect + 1;
                    }
                  }

                  countInjected =
                    countInjected + Object.keys(re.doseInformation).length;
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    gender: re.gender,
                  });
                }
              }
              countInjection =
                countInjection + num_user_injection + countInjected;
              resultFinal.push({
                healthOrganization: item,
                user: listUser,
                countInjection,
                countInjected,
                countSideEffect,
                ratio_injection:
                  countInjection === 0
                    ? "0.00"
                    : ((countInjected / countInjection) * 100).toFixed(2),
                ratio_sideEffect:
                  countInjected === 0
                    ? "0.00"
                    : ((countSideEffect / countInjected) * 100).toFixed(2),
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
        res.json({
          data: resultFinal,
        });
      } else if (startDate !== "" && endDate !== "") {
        let resultFinal = [];
        for (const item of healthOrganizations) {
          await Users.aggregate([
            {
              $project: {
                name: 1,
                identification: 1,
                phonenumber: 1,
                dob: 1,
                gender: 1,
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
            .then(async (result) => {
              let listUser = [];
              let countInjected = 0;
              let countSideEffect = 0;
              const num_user_injection = await InjectionRegister.countDocuments(
                {
                  healthOrganizationId: item.healthOrganizationId,
                }
              );

              const organ_injection = await InjectionRegisterOrgan.find({
                healthOrganizationId: item.healthOrganizationId,
              });
              let countInjection = 0;
              for (const item of organ_injection) {
                countInjection =
                  countInjection + Object.keys(item.userPhone).length;
              }

              for (const re of result) {
                if (Object.keys(re.doseInformation).length !== 0) {
                  for (const kq of re.doseInformation) {
                    if (
                      kq.postInjectionReaction.nameReact !==
                      "616cead53786b07c28376cdb"
                    ) {
                      countSideEffect = countSideEffect + 1;
                    }
                  }

                  countInjected =
                    countInjected + Object.keys(re.doseInformation).length;
                  listUser.push({
                    name: re.name,
                    identification: re.identification,
                    phonenumber: re.phonenumber,
                    dob: re.dob,
                    gender: re.gender,
                  });
                }
              }
              countInjection =
                countInjection + num_user_injection + countInjected;
              resultFinal.push({
                healthOrganization: item,
                user: listUser,
                countInjection,
                countInjected,
                countSideEffect,
                ratio_injection:
                  countInjection === 0
                    ? "0.00"
                    : ((countInjected / countInjection) * 100).toFixed(2),
                ratio_sideEffect:
                  countInjected === 0
                    ? "0.00"
                    : ((countSideEffect / countInjected) * 100).toFixed(2),
              });
            })
            .catch((error) => {
              return res.status(500).json({ msg: error.message });
            });
        }
        res.json({
          data: resultFinal,
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDateInjectionForProvince: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      let healthOrganizations = [];

      const result = await HealthOrganization.findById({ _id: req.user.id });
      const listOrgan = await HealthOrganization.find({
        province: result.province,
        role: 3,
      });
      let listDistrict = [];
      listOrgan.forEach((item) => {
        listDistrict.push({ district: item.district, listWard: [] });
      });
      let filteredList = [...new Set(listDistrict.map(JSON.stringify))].map(
        JSON.parse
      );
      filteredList.forEach((item) => {
        listOrgan.forEach((i) => {
          if (JSON.stringify(i.district) === JSON.stringify(item.district)) {
            item.listWard.push({
              healthOrganizationId: i._id,
              name: i.organization,
            });
          }
        });
      });

      if (startDate === "" && endDate === "") {
        let resultFinal1 = [];
        for (const listItem of filteredList) {
          let resultFinal = [];
          for (const item of listItem.listWard) {
            await Users.aggregate([
              {
                $project: {
                  name: 1,
                  identification: 1,
                  phonenumber: 1,
                  dob: 1,
                  gender: 1,
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
              .then(async (result) => {
                let listUser = [];
                let countInjected = 0;
                let countSideEffect = 0;
                const num_user_injection =
                  await InjectionRegister.countDocuments({
                    healthOrganizationId: item.healthOrganizationId,
                  });

                const organ_injection = await InjectionRegisterOrgan.find({
                  healthOrganizationId: item.healthOrganizationId,
                });
                let countInjection = 0;
                for (const item of organ_injection) {
                  countInjection =
                    countInjection + Object.keys(item.userPhone).length;
                }

                for (const re of result) {
                  if (Object.keys(re.doseInformation).length !== 0) {
                    for (const kq of re.doseInformation) {
                      if (
                        kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb"
                      ) {
                        countSideEffect = countSideEffect + 1;
                      }
                    }

                    countInjected =
                      countInjected + Object.keys(re.doseInformation).length;
                    listUser.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
                countInjection =
                  countInjection + num_user_injection + countInjected;
                resultFinal.push({
                  healthOrganization: item,
                  user: listUser,
                  countInjection,
                  countInjected,
                  countSideEffect,
                  ratio_injection:
                    countInjection === 0
                      ? "0.00"
                      : ((countInjected / countInjection) * 100).toFixed(2),
                  ratio_sideEffect:
                    countInjected === 0
                      ? "0.00"
                      : ((countSideEffect / countInjected) * 100).toFixed(2),
                });
              })
              .catch((error) => {
                return res.status(500).json({ msg: error.message });
              });
          }
          resultFinal1.push({ organ: listItem.district, data: resultFinal });
        }
        let resultFinal2 = [];
        for (const item of resultFinal1) {
          let healthOrganization = item.organ;
          let user = [];
          let countInjection = 0;
          let countInjected = 0;
          let countSideEffect = 0;

          for (const item1 of item.data) {
            user = [...user, ...item1.user];
            countInjection = countInjection + item1.countInjection;
            countInjected = countInjected + item1.countInjected;
            countSideEffect = countSideEffect + item1.countSideEffect;
          }
          resultFinal2.push({
            healthOrganization,
            user: [...new Set(user.map(JSON.stringify))].map(JSON.parse),
            countInjection,
            countInjected,
            countSideEffect,
            ratio_injection:
              countInjection === 0
                ? "0.00"
                : ((countInjected / countInjection) * 100).toFixed(2),
            ratio_sideEffect:
              countInjected === 0
                ? "0.00"
                : ((countSideEffect / countInjected) * 100).toFixed(2),
          });
        }
        res.json(resultFinal2);
      } else if (startDate !== "" && endDate === "") {
        let resultFinal1 = [];
        for (const listItem of filteredList) {
          let resultFinal = [];
          for (const item of listItem.listWard) {
            await Users.aggregate([
              {
                $project: {
                  name: 1,
                  identification: 1,
                  phonenumber: 1,
                  dob: 1,
                  gender: 1,
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
                            $gte: [
                              "$$doseInformation.injectionDate",
                              startDate,
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ])
              .then(async (result) => {
                let listUser = [];
                let countInjected = 0;
                let countSideEffect = 0;
                const num_user_injection =
                  await InjectionRegister.countDocuments({
                    healthOrganizationId: item.healthOrganizationId,
                  });

                const organ_injection = await InjectionRegisterOrgan.find({
                  healthOrganizationId: item.healthOrganizationId,
                });
                let countInjection = 0;
                for (const item of organ_injection) {
                  countInjection =
                    countInjection + Object.keys(item.userPhone).length;
                }

                for (const re of result) {
                  if (Object.keys(re.doseInformation).length !== 0) {
                    for (const kq of re.doseInformation) {
                      if (
                        kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb"
                      ) {
                        countSideEffect = countSideEffect + 1;
                      }
                    }

                    countInjected =
                      countInjected + Object.keys(re.doseInformation).length;
                    listUser.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
                countInjection =
                  countInjection + num_user_injection + countInjected;
                resultFinal.push({
                  healthOrganization: item,
                  user: listUser,
                  countInjection,
                  countInjected,
                  countSideEffect,
                  ratio_injection:
                    countInjection === 0
                      ? "0.00"
                      : ((countInjected / countInjection) * 100).toFixed(2),
                  ratio_sideEffect:
                    countInjected === 0
                      ? "0.00"
                      : ((countSideEffect / countInjected) * 100).toFixed(2),
                });
              })
              .catch((error) => {
                return res.status(500).json({ msg: error.message });
              });
          }
          resultFinal1.push({ organ: listItem.district, data: resultFinal });
        }
        let resultFinal2 = [];
        for (const item of resultFinal1) {
          let healthOrganization = item.organ;
          let user = [];
          let countInjection = 0;
          let countInjected = 0;
          let countSideEffect = 0;

          for (const item1 of item.data) {
            user = [...user, ...item1.user];
            countInjection = countInjection + item1.countInjection;
            countInjected = countInjected + item1.countInjected;
            countSideEffect = countSideEffect + item1.countSideEffect;
          }
          resultFinal2.push({
            healthOrganization,
            user: [...new Set(user.map(JSON.stringify))].map(JSON.parse),
            countInjection,
            countInjected,
            countSideEffect,
            ratio_injection:
              countInjection === 0
                ? "0.00"
                : ((countInjected / countInjection) * 100).toFixed(2),
            ratio_sideEffect:
              countInjected === 0
                ? "0.00"
                : ((countSideEffect / countInjected) * 100).toFixed(2),
          });
        }
        res.json(resultFinal2);
      } else if (startDate === "" && endDate !== "") {
        let resultFinal1 = [];
        for (const listItem of filteredList) {
          let resultFinal = [];
          for (const item of listItem.listWard) {
            await Users.aggregate([
              {
                $project: {
                  name: 1,
                  identification: 1,
                  phonenumber: 1,
                  dob: 1,
                  gender: 1,
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
              .then(async (result) => {
                let listUser = [];
                let countInjected = 0;
                let countSideEffect = 0;
                const num_user_injection =
                  await InjectionRegister.countDocuments({
                    healthOrganizationId: item.healthOrganizationId,
                  });

                const organ_injection = await InjectionRegisterOrgan.find({
                  healthOrganizationId: item.healthOrganizationId,
                });
                let countInjection = 0;
                for (const item of organ_injection) {
                  countInjection =
                    countInjection + Object.keys(item.userPhone).length;
                }

                for (const re of result) {
                  if (Object.keys(re.doseInformation).length !== 0) {
                    for (const kq of re.doseInformation) {
                      if (
                        kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb"
                      ) {
                        countSideEffect = countSideEffect + 1;
                      }
                    }

                    countInjected =
                      countInjected + Object.keys(re.doseInformation).length;
                    listUser.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
                countInjection =
                  countInjection + num_user_injection + countInjected;
                resultFinal.push({
                  healthOrganization: item,
                  user: listUser,
                  countInjection,
                  countInjected,
                  countSideEffect,
                  ratio_injection:
                    countInjection === 0
                      ? "0.00"
                      : ((countInjected / countInjection) * 100).toFixed(2),
                  ratio_sideEffect:
                    countInjected === 0
                      ? "0.00"
                      : ((countSideEffect / countInjected) * 100).toFixed(2),
                });
              })
              .catch((error) => {
                return res.status(500).json({ msg: error.message });
              });
          }
          resultFinal1.push({ organ: listItem.district, data: resultFinal });
        }
        let resultFinal2 = [];
        for (const item of resultFinal1) {
          let healthOrganization = item.organ;
          let user = [];
          let countInjection = 0;
          let countInjected = 0;
          let countSideEffect = 0;

          for (const item1 of item.data) {
            user = [...user, ...item1.user];
            countInjection = countInjection + item1.countInjection;
            countInjected = countInjected + item1.countInjected;
            countSideEffect = countSideEffect + item1.countSideEffect;
          }
          resultFinal2.push({
            healthOrganization,
            user,
            countInjection,
            countInjected,
            countSideEffect,
            ratio_injection:
              countInjection === 0
                ? "0.00"
                : ((countInjected / countInjection) * 100).toFixed(2),
            ratio_sideEffect:
              countInjected === 0
                ? "0.00"
                : ((countSideEffect / countInjected) * 100).toFixed(2),
          });
        }
        res.json(resultFinal2);
      } else if (startDate !== "" && endDate !== "") {
        let resultFinal1 = [];
        for (const listItem of filteredList) {
          let resultFinal = [];
          for (const item of listItem.listWard) {
            await Users.aggregate([
              {
                $project: {
                  name: 1,
                  identification: 1,
                  phonenumber: 1,
                  dob: 1,
                  gender: 1,
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
                            $gte: [
                              "$$doseInformation.injectionDate",
                              startDate,
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ])
              .then(async (result) => {
                let listUser = [];
                let countInjected = 0;
                let countSideEffect = 0;
                const num_user_injection =
                  await InjectionRegister.countDocuments({
                    healthOrganizationId: item.healthOrganizationId,
                  });

                const organ_injection = await InjectionRegisterOrgan.find({
                  healthOrganizationId: item.healthOrganizationId,
                });
                let countInjection = 0;
                for (const item of organ_injection) {
                  countInjection =
                    countInjection + Object.keys(item.userPhone).length;
                }

                for (const re of result) {
                  if (Object.keys(re.doseInformation).length !== 0) {
                    for (const kq of re.doseInformation) {
                      if (
                        kq.postInjectionReaction.nameReact !==
                        "616cead53786b07c28376cdb"
                      ) {
                        countSideEffect = countSideEffect + 1;
                      }
                    }

                    countInjected =
                      countInjected + Object.keys(re.doseInformation).length;
                    listUser.push({
                      name: re.name,
                      identification: re.identification,
                      phonenumber: re.phonenumber,
                      dob: re.dob,
                      gender: re.gender,
                    });
                  }
                }
                countInjection =
                  countInjection + num_user_injection + countInjected;
                resultFinal.push({
                  healthOrganization: item,
                  user: listUser,
                  countInjection,
                  countInjected,
                  countSideEffect,
                  ratio_injection:
                    countInjection === 0
                      ? "0.00"
                      : ((countInjected / countInjection) * 100).toFixed(2),
                  ratio_sideEffect:
                    countInjected === 0
                      ? "0.00"
                      : ((countSideEffect / countInjected) * 100).toFixed(2),
                });
              })
              .catch((error) => {
                return res.status(500).json({ msg: error.message });
              });
          }
          resultFinal1.push({ organ: listItem.district, data: resultFinal });
        }
        let resultFinal2 = [];
        for (const item of resultFinal1) {
          let healthOrganization = item.organ;
          let user = [];
          let countInjection = 0;
          let countInjected = 0;
          let countSideEffect = 0;

          for (const item1 of item.data) {
            user = [...user, ...item1.user];
            countInjection = countInjection + item1.countInjection;
            countInjected = countInjected + item1.countInjected;
            countSideEffect = countSideEffect + item1.countSideEffect;
          }
          resultFinal2.push({
            healthOrganization,
            user: [...new Set(user.map(JSON.stringify))].map(JSON.parse),
            countInjection,
            countInjected,
            countSideEffect,
            ratio_injection:
              countInjection === 0
                ? "0.00"
                : ((countInjected / countInjection) * 100).toFixed(2),
            ratio_sideEffect:
              countInjected === 0
                ? "0.00"
                : ((countSideEffect / countInjected) * 100).toFixed(2),
          });
        }
        res.json(resultFinal2);
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

module.exports = reportCtrl;
