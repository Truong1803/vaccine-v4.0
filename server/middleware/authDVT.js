const Organization = require("../model/organization");

const authDVT = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Organization.findOne({
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
