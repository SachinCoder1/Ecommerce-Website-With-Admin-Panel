const Users = require("../models/userSchema");

const adminAuth = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user.role === 0) return res.status(400).json({ msg: "Access denied" });

    //  If Admin
    next();
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = adminAuth;
