const Provinces = require("../model/province");
const provinceCtrl = {
  getById: async (req, res) => {
    try {
      const data = await Provinces.findOne({ provinceId: req.params.id });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = provinceCtrl;
