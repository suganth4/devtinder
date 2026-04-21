const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const {User} = require("../models/user.model");

const authService = {
  registerUser: async ({ firstName, lastName, age, emailId, password }) => {
    const userExsist = await User.findOne({ emailId });
    if (userExsist) {
      throw {
        code: "USER_ALREADY_EXISTS",
        status: 409,
        message: "User already exist",
      };
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      age: age,
      emailId: emailId,
      password: password,
    });
    await user.save();
  },
  loginUser: async ({ emailId, password }) => {
    const userExsist = await User.findOne({ emailId });
    if (!userExsist) {
      throw {
        code: "INVALID_CREDENTIALS",
        status: 401,
        message: "Invalid Credentials",
      };
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExsist.password,
    );

    if (isPasswordCorrect) {
      const token = jwt.sign({ userId: userExsist._id }, "devTinder", {
        expiresIn: 60,
      });
      return token;
    } else {
      throw {
        code: "INVALID_CREDENTIALS",
        status: 401,
        message: "Invalid Credentials",
      };
    }
  }
};

module.exports = authService;
