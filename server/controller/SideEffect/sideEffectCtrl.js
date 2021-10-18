const SideEffect = require("../../model/sideEffect");

const SideEffectCtrl = {
  create: async (req, res) => {
    try {
      const newSideEffect = new SideEffect(req.body);
      await newSideEffect.save();
      res.json({ msg: "Tạo mới phản ứng tiêm thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await SideEffect.find();
      res.json({ data: data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = SideEffectCtrl;
