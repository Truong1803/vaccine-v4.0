const InjectionInfor = require("../../model/injection_infor");
const Users = require("../../model/user");
const InjectionInforCtrl = {
  updatePreInjection: async (req, res) => {
    try {
      const {
        temperature,
        bloodVessel,
        bloodPressure,
        breathing,
        injectorName,
      } = req.body.preInjectionReaction;
      const result = await InjectionInfor.findByIdAndUpdate(
        { _id: req.params.id },
        {
          preInjectionReaction: {
            temperature,
            bloodVessel,
            bloodPressure,
            breathing,
            injectorName,
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
      const result = await InjectionInfor.findByIdAndUpdate(
        { _id: req.params.id },
        {
          postInjectionReaction: req.body.postInjectionReaction,
        },
        { new: true }
      );
      const {
        dose,
        injectionDate,
        vaccineId,
        diseaseId,
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
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = InjectionInforCtrl;
