const { Router } = require("express");
const router = Router();
// middlewares
const { validate } = require("../middlewares/validatorHandler");
// schema
const { loginSchema } = require("../validators/login.validator");
const loginController = require("../controller/login.controller");

router.post("/", validate(loginSchema), loginController);

module.exports = router;