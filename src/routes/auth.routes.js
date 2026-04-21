const express = require('express');
const authRoute = express.Router();

const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')

authRoute.post("/signUp", authMiddleware.validateRegisterRequest, authController.signUp);

authRoute.post("/login", authController.login);

module.exports = authRoute;