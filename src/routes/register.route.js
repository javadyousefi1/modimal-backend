const { Router } = require("express");
// router = new Router
const router = Router();
// controller
const registerController = require("../controller/register.controller");
// middlewares
const { validate } = require("../middlewares/validatorHandler");
// schema
const { registerSchema } = require("../validators/register.validator");

router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  validate(registerSchema),
  registerController
);

module.exports = router;
