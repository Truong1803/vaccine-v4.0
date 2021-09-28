const authOthers = require('../model/authOther');

const authCTY = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await authOthers.findOne({
      _id: req.user.id,
    });
    if (user.role !== 2)
      return res.status(400).json({ msg: 'CTY resources access denied' });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authCTY;
