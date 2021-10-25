const InjectionRegister = require("../../model/injection_register");
const InjectionRegisterOrgan = require("../../model/organ_injection_register");
const Users = require("../../model/user");
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
        ratio_injection: (countInjected / countInjection) * 100,
        ratio_sideEffect: (countSideEffect / countInjected) * 100,
      };
      res.json({ data: data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = reportCtrl;
