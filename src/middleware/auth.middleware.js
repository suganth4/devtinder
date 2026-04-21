const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const authMiddleware = {
  validateRegisterRequest: (req, res, next) => {
    const { emailId, password } = req.body;
    const errors = [];

    if (!validator.isEmail(emailId)) {
      errors.push("please enter valid email address");
    }
    if (!validator.isStrongPassword(password)) {
      errors.push("password should be strong");
    }

    if (errors.length > 0) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Bad Request",
        errors: errors,
      });
    } else {
      next();
    }
  },
  userAuth: async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Invalid Token",
        },
      });
    }
    const { userId } = jwt.verify(token, "devTinder");
    const user = await User.findById(userId);
    
    req.user = user;
    next();
  }
}

module.exports = authMiddleware;
