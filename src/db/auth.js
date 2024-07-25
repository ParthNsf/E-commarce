const jwt = require("jsonwebtoken");
const Users = require("../model/users.model");

const auth = (roles=[]) => async (req, res, next) => {
  try {
    const token = req.cookies.accsesstoken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not valid",
      });
    }

    try {
      const checkToken = await jwt.verify(token, "exprngkjrgkrkgire");

      console.log(checkToken);

      const user = Users.findById(checkToken._id)

      if (roles.some((v) => v === user.role)) {
        return res.status(403).json({
          success: false,
          message: "not authorized",
        });
      }

      req.user = user;
      next();   

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "token not valid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internel server error",
    });
  }
  // Authentication middleware
};

module.exports = auth;
