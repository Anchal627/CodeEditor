const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifytoken);
    const rootUser = await User.findOne({ _id: verifytoken._id });
    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("User not found!");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized no token provide",
    });
  }
};
module.exports = authenticate;
