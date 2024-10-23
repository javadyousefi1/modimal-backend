// error handling
const createError = require("http-errors");
const axios = require("axios");

const captchaHandler = async (req, res, next) => {

    try {
        if (!req.body.token) throw new createError.BadRequest("token not sent!")
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.GOOGLE_CAPTCHA_VALIDATE_KEY,
                    response: req.body.token,
                },
            }
        );
        if (response?.data.success === true) {
            req.captchaIsValid = true
            next()
        } else {
            throw new Error("captcha validtion failed")
        }
    } catch (e) {
        next(e)
    }
}


module.exports = { captchaHandler }