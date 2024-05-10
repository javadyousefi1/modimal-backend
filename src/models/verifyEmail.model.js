const { Schema, model } = require("mongoose");

const verifyEmailSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    verifyCode: { type: Number, required: true, trim: true },
    createdAt: { type: Number, required: true, trim: true },
  },
  { versionKey: false }
);

const verifyEmailModel = model("verifyCode", verifyEmailSchema);

module.exports = {
  verifyEmailModel,
};
