const { Router } = require("express");
const router = Router();
// routes
const registerRoute = require("./register.routes");
const loginRoute = require("./login.routes");
const userRoute = require("./users.routes");
const verifyEmail = require("./verifyEmail.routes");
const product = require("./product.routes");
const checkAuth = require("./checkAuth.routes");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/users", userRoute);
router.use("/verifyEmail", verifyEmail);
router.use("/product", product);
router.use("/checkAuth", checkAuth);

module.exports = router;
