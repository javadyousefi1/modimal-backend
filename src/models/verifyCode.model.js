const { Schema, model } = require("mongoose");

const verifyCodeSchema = new Schema({
  email: { type: String, required: true },
  verifyCode: { type: Number, required: true },
});

const verifyCodeModel = model("verifyCode", verifyCodeSchema);

module.exports = {
  verifyCodeModel,
};
