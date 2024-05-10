// models
const { authModel } = require("../models/auth.model");
const {
  verifyEmailModel: verifyCodeModel,
  verifyEmailModel,
} = require("../models/verifyEmail.model");
// utils
const sendVerifyCode = require("../utils/sendVerifyCode");
const { generateToken, checkTokenValid } = require("../utils/token");

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

const checkAuthController = async (req, res, next) => {
  const cookies = req.cookies;

  if (!req.cookies || !req.cookies?.token) {
    return res.status(401).json({
      statusCode: res.statusCode,
      message: "token is not avalible",
      data: null,
    });
  }

  const tokenData = await checkTokenValid(cookies.token);
  if (!tokenData?.email) {
    res.status(401).json({
      statusCode: res.statusCode,
      message: tokenData || "user token is verify",
      data: null,
    });
  } else {
    const userData = await authModel.findOne({
      email: tokenData.email.toLowerCase(),
    });

    res.status(200).json({
      statusCode: res.statusCode,
      message: "user token is verify",
      data: userData,
    });
  }
};

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
    await authModel.updateOne({ email }, { isVerify: true });
    const updatedUserData = await authModel.findOne({ email });
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

module.exports = { registerController, loginController, checkAuthController ,verifyEmailController};
