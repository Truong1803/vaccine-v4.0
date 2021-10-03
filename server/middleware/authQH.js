const HealthOrganization = require("../model/healthOrganization");

const authQH = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await HealthOrganization.findOne({
      _id: req.user.id,
    });
    if (user.role !== 4)
      return res.status(400).json({ msg: "QH resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authQH;
