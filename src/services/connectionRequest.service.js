const { ConnectRequest } = require("../models/connectionRequest.model");

const connectionRqService = {
  connectionRequest: async (req) => {
    const { toUserId, status } = req.params;
    const fromUserId = req.user._id;

    const isRequestExist = await ConnectRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (isRequestExist) {
      throw {
        status: 409,
        code: "RESOURCE_ALREADY_EXISTS",
        message: "Request has been sent already",
      };
    }
    const request = new ConnectRequest({
      toUserId: toUserId,
      fromUserId: fromUserId,
      status: status,
    });
    await request.save();
  },
};

module.exports = connectionRqService;
