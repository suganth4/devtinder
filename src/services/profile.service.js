const { User } = require("../models/user.model");

const profileService = {
    userProfile: async (user) => {
    if (!user) {
      throw {
        code: "USER_NOT_FOUND",
        status: 404,
        message: "user not found",
      };
    }
    return user;
  },
}

module.exports = profileService;