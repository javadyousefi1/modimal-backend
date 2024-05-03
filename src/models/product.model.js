const { Schema, model } = require("mongoose");

const registerSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    bannerUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const registerModel = model("register", registerSchema, "users");

module.exports = {
  registerModel,
};
