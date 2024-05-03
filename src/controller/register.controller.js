// models
const { registerModel } = require("../models/register.model");
const { verifyEmailModel: verifyCodeModel } = require("../models/verifyEmail.model");
// utils
const sendVerifyCode = require("../utils/sendVerifyCode");

const registerController = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;

  const isUserAlreadyExist = await registerModel.countDocuments({ email });

  if (isUserAlreadyExist !== 0) {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "this email already exists",
      data: null,
    });
    return;
  }

  await registerModel
    .create({
      firstName,
      lastName,
      email,
      password,
    })
    .then(async (response) => {
      const verifyCode = Math.floor(100000 + Math.random() * 900000);

      await sendVerifyCode(firstName, lastName, email, verifyCode);
      await verifyCodeModel.create({ email, verifyCode });

      res.status(200).json({
        statusCode: res.statusCode,
        message: "user register succesfully",
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        statusCode: res.statusCode,
        message: err.message,
        data: null,
      });
    });
};

module.exports = registerController;
