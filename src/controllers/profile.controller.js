const profileService = require("../services/profile.service");

const profileController = {
  profile: async (req, res, next) => {
    try {
      const user = await profileService.userProfile(req.user);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = profileController;
