const Controller = require('../../common/controllers/controller')
// model
const { userModel } = require('./user.model')
// error handling
const createError = require("http-errors");
// jwt
const { JwtController } = require("../jwt/jwt.controller");
// constants
const NodeEnv = require('../../common/constants/env.enum');
const CookieEnv = require('../../common/constants/cookies.enum');
// jwt
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require('mongoose');

class UserController extends Controller {
    #model
    constructor() {
        super()
        this.#model = userModel
    }

    async registerUser(req, res, next) {
        try {
            // get data from body
            const { userName, password } = req.body;
            const newUser = { userName, password };
            // check dublicate
            const isAlreadyExist = await this.#model.countDocuments({ userName: userName.trim() })
            if (isAlreadyExist) throw new createError.BadRequest("this user with this userName already exists !")
            // insert new category to DB
            const newUserCreated = await this.#model.create(newUser);
            // set token on cookie
            const token = await JwtController.generateNewToken(userName, next);
            // set token on cookie
            res.cookie('admin_panel_jwt', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true, secure: true, sameSite: 'lax', });
            // response
            res.status(200).json({
                statusCode: res.statusCode,
                message: "you registered succsefully",
                data: newUserCreated
            })
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req, res, next) {
        try {
            // get data from body
            const { userName, password, token, code } = req.body;
            console.log({ userName, password, token, code })
            if (!token || !code) throw Error("token or code not send")

            const result = await this.#model.countDocuments({ userName, password })

            const captcha = await req.redis.get(token, code);

            if (+captcha !== +code) {
                return res.status(400).json({
                    statusCode: res.statusCode,
                    data: null,
                    message: "کد امنیتی اشتباه است",
                })
            }

            if (result === 0) {
                throw new createError.Unauthorized("نام کاربری یا رمز عبور اشتباه است")
            }
            // set token on cookie
            const cookieToken = await JwtController.generateNewToken(userName, next);
            console.log(cookieToken, "cookieToken")
            // set token on cookie
            res.cookie('admin_panel_jwt', cookieToken, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true, sameSite: 'none', secure: process.env.NODE_ENV === "production", domain: process.env.DOMAIN, });
            // response
            res.status(200).json({
                statusCode: res.statusCode,
                message: "you logged in succsefully",
                // data: userData
            })
        } catch (error) {
            next(error)
        }
    }


    async getCookie(req, res, next) {
        try {
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all users gets successfully",
                data: req.cookies
            })
        } catch (error) {
            next(error)
        }
    }



    async getAllUsers(req, res, next) {
        try {
            const users = await this.#model.find({});
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all users gets successfully",
                data: users
            })
        } catch (error) {
            next(error)
        }
    }

    async getCurrentUser(req, res, next) {
        try {

            // get user token
            const token = req?.cookies?.admin_panel_jwt
            console.log("gcuc", req?.cookies)
            console.log(token, "get current user")
            // reject if token is not available
            if (!token) throw new createError.Unauthorized("user not logged in")
            const tokenData = await jwt.verify(token, process.env.JWT_SECRET)
            // check userName is in user model or not
            if ("userName" in tokenData) {
                const userData = await userModel.findOne({ userName: tokenData.userName }, { createdAt: 0, updatedAt: 0, _id: 0, password: 0 }).lean()
                console.log(userData, "userData")
                return res.status(200).json({
                    statusCode: res.statusCode,
                    message: "user data gets successfully",
                    data: userData
                })
            }
            throw new createError.Unauthorized("user token is not verify")
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.query;
        await this.isUserAlreadyExsits(id, next)
        try {
            const user = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "user deleted successfully",
                data: user._id
            })
        } catch (error) {
            next(error)
        }
    }

    async logoutUser(req, res, next) {
        try {
            res.clearCookie(CookieEnv.BLOG_JWT).status(200).json({
                statusCode: res.statusCode,
                message: "user logout successfully"
            })
        } catch (error) {
            next(error)
        }
    }



    async isUserAlreadyExsits(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your user id is not valid")
            const foundUser = await this.#model.countDocuments({ _id: id })
            if (!foundUser) throw new createError.NotFound("not found a user with this id !")
        } catch (error) {
            next(error)
        }
    }

    async addAdminRoleToUser(req, res, next) {
        try {
            const { userId } = req.body;
            await this.isUserAlreadyExsits(userId, next)
            const updateResult = await this.#model.updateOne({ _id: userId }, { role: 'admin' })
            if (updateResult.modifiedCount !== 1) throw new createError.BadRequest("update user role failed")
            res.status(200).json({
                statusCode: res.statusCode,
                message: "user role updated successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    async addUserRoleToUser(req, res, next) {
        try {
            const { userId } = req.body;
            await this.isUserAlreadyExsits(userId, next)
            const updateResult = await this.#model.updateOne({ _id: userId }, { role: 'user' })
            if (updateResult.modifiedCount !== 1) throw new createError.BadRequest("update user role failed")
            res.status(200).json({
                statusCode: res.statusCode,
                message: "user role updated successfully"
            })
        } catch (error) {
            next(error)
        }
    }

}


module.exports = { UserController: new UserController() }