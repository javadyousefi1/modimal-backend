const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    profile: {
      type: String,
      default: null,
    },
    joinDate: {
      type: Number,
      default: new Date().getTime(),
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const authModel = model("register", authSchema, "users");

module.exports = {
  authModel,
};
