// models
const { registerModel } = require("../models/register.model");

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
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user logged in successfully",
      data: userData,
    });
  }
};

module.exports = loginController;
