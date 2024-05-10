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
  checkAuthController,
  verifyEmailController,resendEmailVerifyCode
} = require("../controller/auth.controller");

router.post("/login", validate(loginSchema), loginController);
router.post("/register", validate(registerSchema), registerController);
router.get("/checkAuth", checkAuthController);
router.post("/verifyEmail", verifyEmailController);
router.post("/resendEmailVerifyCode", resendEmailVerifyCode);

module.exports = router;
