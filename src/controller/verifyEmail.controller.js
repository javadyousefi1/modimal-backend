// models
const { registerModel } = require("../models/register.model");
const { verifyEmailModel } = require("../models/verifyEmail.model");

const verifyEmailController = async (req, res) => {
  const { email, verifyCode } = req.body;

  const codeIsValid =
    (await verifyEmailModel.countDocuments({
      email,
      verifyCode,
    })) === 1;

  if (codeIsValid) {
    await registerModel.updateOne({ email }, { isVerify: true });
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user verify succsecfully",
    });
  } else {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "verify code is not correct",
    });
  }
};

module.exports = { verifyEmailController };
