const { Router } = require("express");
const { checkTokenValid } = require("../utils/token");
const { registerSchema } = require("../validators/register.validator");
const { registerModel } = require("../models/register.model");
const router = Router();

router.get("/", async (req, res, next) => {
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
    const userData = await registerModel.findOne({ email: tokenData.email });

    res.status(200).json({
      statusCode: res.statusCode,
      message: "user token is verify",
      data: userData,
    });
  }
});

module.exports = router;
