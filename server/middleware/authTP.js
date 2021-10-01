const Organization = require("../model/organization");

const authTP = async (req, res, next) => {
  try {
    // Get user information by id
    // console.log(req.user.id);
    // const user = await Organization.find();
    const user = await Organization.findOne({ _id: req.user.id });

    if (user.role !== 5)
      return res.status(400).json({ msg: "TP resources access denied" });
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authTP;
