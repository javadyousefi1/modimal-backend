// models
const { registerModel } = require("../models/register.model");
const { verifyEmailModel } = require("../models/verifyEmail.model");

const verifyEmailController = async (req, res) => {
  const { email, verifyCode } = req.body;

  const isVerifyCodeNum = isNaN(Number(verifyCode));

  if (isVerifyCodeNum) {
    return res.status(400).json({
      statusCode: res.statusCode,
      message: "verify code is not a number",
    });
  }

  const codeIsValid =
    (await verifyEmailModel.countDocuments({
      email,
      verifyCode: Number(verifyCode),
    })) === 1;

  if (codeIsValid) {
    await registerModel.updateOne({ email }, { isVerify: true });
    const updatedUserData = await registerModel.findOne({ email });
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user verify succsecfully",
      userData: updatedUserData,
    });
  } else {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "verify code is not correct",
    });
  }
};

module.exports = { verifyEmailController };
