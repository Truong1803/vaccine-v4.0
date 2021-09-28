const Wards = require("../model/ward");
const wardCtrl = {
  getById: async (req, res) => {
    try {
      const data = await Wards.findOne({
        provinceId: req.params.id1,
        districtId: req.params.id2,
        wardId: req.params.id3,
      });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = wardCtrl;
