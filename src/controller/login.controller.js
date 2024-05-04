// models
const { registerModel } = require("../models/register.model");
// utils
const { generateToken } = require("../utils/token");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const foundedUser = await registerModel.find({ email, password });
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
    res.cookie("token", token, { maxAge: 50000, httpOnly: true, secure: true });

    console.log("ok");
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user logged in successfully",
      data: userData,
    });
  }
};

module.exports = loginController;
