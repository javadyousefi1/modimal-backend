const { UserController } = require("./user.controller");
const { checkIsAdmin, isAuthorized } = require("../../common/guards/auth.guard");
const { captchaHandler } = require("../../common/captcha/captchaHandler");
const router = require("express").Router();

router.post("/login-user", UserController.loginUser)
router.post("/register-user", UserController.registerUser)
// router.post("/add-admin-role",  UserController.addAdminRoleToUser)
// router.post("/add-user-role", checkIsAdmin, UserController.addUserRoleToUser)
// router.get("/get-all-users", checkIsAdmin, UserController.getAllUsers)
router.get("/get-current-user", UserController.getCurrentUser)
router.get("/get-cookie", UserController.getCookie)
// router.get("/logout-user", isAuthorized, UserController.logoutUser)
// router.delete("/delete-user", checkIsAdmin, UserController.deleteUser)
// router.put("/update-category", CategoryController.updateCategory)

module.exports = {
    userRoutes: router
}