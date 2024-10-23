// multer
const multer = require('multer');
// router
const router = require("express").Router();
// controllers
const { CaptchaController } = require("./captcha.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")


router.get("/create-captcha", CaptchaController.createCaptcha)
router.get("/validate-captcha", CaptchaController.validateCaptcha)


module.exports = {
    captchaRoutes: router
}