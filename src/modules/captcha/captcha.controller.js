const { isValidObjectId, default: mongoose } = require('mongoose');
const Controller = require('../../common/controllers/controller.js')
// error handling
const createError = require("http-errors");
// path
const path = require('path');
const fs = require('fs');
const { paginate, buildSearchQuery } = require('../../utils/helpers.js');
class CaptchaController extends Controller {
    #model
    constructor() {
        super()
    }
    async createCaptcha(req, res, next) {
        try {

            const key = String(new mongoose.Types.ObjectId());

            const value = Math.floor(Math.random() * 999_999);

            await req.redis.set(key, value);
            await req.redis.expire(key, 60);

            res.status(200).json({
                statusCode: res.statusCode,
                data: {
                    token: key, code: value
                },
                message: "Captcha gets successfully",
            })
        } catch (error) {

            next(error)
        }
    }

    async validateCaptcha(req, res, next) {
        try {
            const { token, code } = req.query

            if (!token || !code) throw Error("token or code not send")

            const result = await req.redis.get(token, code);


            if (result) {
                res.status(200).json({
                    statusCode: res.statusCode,
                    message: "validate successfully",
                })
            } else {
                res.status(400).json({
                    statusCode: res.statusCode,
                    data: null,
                    message: "token not available or expired",
                })
            }



        } catch (error) {

            next(error)
        }
    }


}


module.exports = { CaptchaController: new CaptchaController() }