const { Schema, model } = require("mongoose");

const verifyCodeSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    verifyCode: { type: Number, required: true, trim: true },
  },
  { versionKey: false }
);

const verifyCodeModel = model("verifyCode", verifyCodeSchema);

module.exports = {
  verifyCodeModel,
};
