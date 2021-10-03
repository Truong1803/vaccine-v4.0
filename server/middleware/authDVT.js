const HealthOrganization = require("../model/healthOrganization");

const authDVT = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await HealthOrganization.findOne({
      _id: req.user.id,
    });
    if (user.role !== 3)
      return res.status(400).json({ msg: "DVT resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authDVT;
