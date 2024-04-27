const { Schema, model } = require("mongoose");

const registerSchema = new Schema(
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
    address: {
      type: String,
      default: null,
    },
    joinDate: {
      type: number,
      default: new Date().getTime(),
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const registerModel = model("register", registerSchema, "users");

module.exports = {
  registerModel,
};
