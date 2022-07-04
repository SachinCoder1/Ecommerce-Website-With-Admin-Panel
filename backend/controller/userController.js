require("dotenv").config();
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "User with this email Already Exists" });

      if (password.length < 6)
        return res.status(400).json({ msg: "Password is too short." });

      //  Password Hashing
      const hashPassword = await bcrypt.hash(password, 10);

      const createUser = new User({
        name,
        email,
        password: hashPassword,
      });

      await createUser.save();

      //  Generating token after signup.
      const accessToken = createAccessToken({ id: createUser._id });
      const refreshToken = createRefreshToken({ id: createUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/user/refresh_token",
      });

      return res
        .status(201)
        .json({ msg: "User Registered Successfully", token: accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "There is an error", error: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if(!refresh_token) return res.status(400).json({ msg: "Please Login Again." });
      jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (error, user)=>{
        if(error) return res.status(400).json({ msg: "Please Login Again." });
        const accessToken = createAccessToken({id: user.id})
        res.json({user, accessToken});
      })
      res.json({ refresh_token });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = userController;
