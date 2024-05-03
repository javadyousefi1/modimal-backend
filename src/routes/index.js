const { Router } = require("express");
const router = Router();
// routes
const registerRoute = require("./register.route");
const loginRoute = require("./login.route");
const userRoute = require("./users.route");
const verifyEmail = require("./verifyEmail.route");
const product = require("./product.route");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/users", userRoute);
router.use("/verifyEmail", verifyEmail);
router.use("/product", product);

module.exports = router;
