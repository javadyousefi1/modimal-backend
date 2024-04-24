// const Data = require('../models/dataModel');
const userRegister = require("../models/userRegisterModel");

exports.postData = async (req, res) => {
  try {
    // const data = new userRegister(req.body);
    // await data.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
