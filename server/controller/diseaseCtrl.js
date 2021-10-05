const Disease = require("../model/disease");
const DiseaseCtrl = {
  getAll: async (req, res) => {
    try {
      const data = await Disease.find();
      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const data = await Disease.findById({ _id: req.params.id });
      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createDisease: async (req, res) => {
    try {
      const { diseaseName } = req.body;
      const item = await Disease.findOne({ diseaseName });
      if (item) return res.status(400).json({ msg: "Bệnh nền này đã tồn tại" });
      const newDisease = new Disease({ diseaseName });
      await newDisease.save();
      return res.json({
        data: newDisease,
        msg: "Tạo mới thành công một bệnh nền",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateDisease: async (req, res) => {
    try {
      const { diseaseName } = req.body;
      const updateDisease = await Disease.findByIdAndUpdate(
        { _id: req.params.id },
        { diseaseName },
        { new: true }
      );
      return res.json({
        data: updateDisease,
        msg: "Cập nhật thành công một bệnh nền",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteDisease: async (req, res) => {
    try {
      const deleteDisease = await Disease.findByIdAndDelete({
        _id: req.params.id,
      });
      return res.json({
        data: deleteDisease,
        msg: "Xoá thành công một bệnh nền",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = DiseaseCtrl;
