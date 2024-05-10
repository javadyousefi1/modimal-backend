// models
const { authModel } = require("../models/auth.model");
const {
  verifyEmailModel: verifyCodeModel,
} = require("../models/verifyEmail.model");
// utils
const sendVerifyCode = require("../utils/sendVerifyCode");
const { generateToken } = require("../utils/token");

const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  const isUserAlreadyExist = await authModel.countDocuments({ email });

  if (isUserAlreadyExist !== 0) {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "this email already exists",
      data: null,
    });
    return;
  }

  await authModel
    .create({
      firstName,
      lastName,
      email: lowerCaseEmail,
      password,
    })
    .then(async (response) => {
      const verifyCode = Math.floor(100000 + Math.random() * 900000);

      await sendVerifyCode(firstName, lastName, email, verifyCode);
      await verifyCodeModel.create({ email: lowerCaseEmail, verifyCode });

      const token = await generateToken({ email });
      // 86400000
      res.cookie("token", token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: true,
      });

      res.status(200).json({
        statusCode: res.statusCode,
        message: "you register succesfully",
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

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  const foundedUser = await authModel.find({
    email: lowerCaseEmail,
    password,
  });
  if (foundedUser.length === 0) {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "email or password is un correct",
      data: null,
    });
  } else {
    const userData = foundedUser[0];
    delete userData.password;

    const token = await generateToken({ email });
    // 86400000
    res.cookie("token", token, {
      maxAge: 36000000,
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      statusCode: res.statusCode,
      message: "you logged in successfully",
      data: userData,
    });
  }
};

module.exports = { registerController, loginController };
