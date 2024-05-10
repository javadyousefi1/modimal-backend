const { Router } = require("express");
const router = Router();
// middlewares
const { validate } = require("../middlewares/validatorHandler");
// schema
const { loginSchema, registerSchema } = require("../validators/auth.validator");
// controller
const {
  loginController,
  registerController,
} = require("../controller/auth.controller");

router.post("/login", validate(loginSchema), loginController);
router.post("/register", validate(registerSchema), registerController);

module.exports = router;
