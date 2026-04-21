const express = require("express");
const profileRoute = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

profileRoute.get(
  "/profile",
  authMiddleware.userAuth,
  profileController.profile,
);

profileRoute.post("/profile/edit", authMiddleware.userAuth);

module.exports = profileRoute;
