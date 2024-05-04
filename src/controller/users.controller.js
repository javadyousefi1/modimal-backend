// models
const { registerModel } = require("../models/register.model");

const getUserController = async (req, res) => {
  const usersList = await registerModel
    .find({})
    .sort({ _id: -1 })
    .select("-password");
  res.status(200).json({
    statusCode: res.statusCode,
    message: "users list gets succsesfully",
    data: usersList,
  });
};

module.exports = { getUserController };