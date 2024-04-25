const { Schema, model } = require("mongoose");

const registerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
    type: String,
    default: new Date().getTime(),
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
});

const registerModel = model("register", registerSchema, "users");

module.exports = {
  registerModel,
};
