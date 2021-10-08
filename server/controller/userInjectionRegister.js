const InjectionRegister = require("../model/injection_register");
const ScheduleInjection = require("../model/schedule_injection");
const UserInjectionRegisterCtrl = {
  getInjectionRegister: async (req, res) => {
    try {
      const result = await InjectionRegister.findOne({ userId: req.user.id });
      if (!result)
        return res.json({ msg: "Tài khoản hiện chưa đăng ký tiêm chủng" });
      return res.json({ data: result });
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
        vaccineId,
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
