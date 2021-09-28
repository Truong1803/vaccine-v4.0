const Districts = require("../model/district");
const districtCtrl = {
  getById: async (req, res) => {
    try {
      const data = await Districts.findOne({
        districtId: req.params.id,
      });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = districtCtrl;
