const authService = require("../services/auth.service");

const authController = {
  signUp: async (req, res, next) => {
    try {
      await authService.registerUser(req.body);
      res.status(201).send({
        success: true,
        message: "user created successfully",
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const token = await authService.loginUser(req.body);
      res.cookie("token", token);
      res.status(200).send({ success: true, message: "Login Successfully" });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;
