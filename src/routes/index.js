const { Router } = require("express");
const router = Router();
// routes
const registerRoute = require("./register.route");
const loginRoute = require("./login.route");
const userRoute = require("./users.route");
const verifyEmail = require("./verifyEmail.route");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/users", userRoute);
router.use("/verifyEmail", verifyEmail);

module.exports = router;
