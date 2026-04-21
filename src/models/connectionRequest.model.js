const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: String,
      required: true,
    },
    toUserId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "ignored"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  },
);

ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

ConnectionRequestSchema.pre("save", function () {
  if (this.fromUserId === this.toUserId) {
    throw {
      code: "BAD_REQUEST",
      status: 400,
      message: "Sending Request to yourself is not allowed",
    };
  }
});

const ConnectRequest = mongoose.model(
  "connectionRequest",
  ConnectionRequestSchema,
);

module.exports = { ConnectRequest };
