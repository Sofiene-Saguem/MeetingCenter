const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
      res.status(401).json([{ msg: "unauthorized" }]);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json([{ msg: "unauthorized" }]);
  }
};

module.exports = isAuth;
