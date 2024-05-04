const { Router } = require("express");
// router
const router = Router();
// controllers
const {
  verifyEmailController,
} = require("../controller/verifyEmail.controller");

router.post("/", verifyEmailController);

module.exports = router;
