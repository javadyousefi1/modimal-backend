const { Router } = require("express");
const router = Router();
// routes   
const userRoute = require("./users.routes");
const verifyEmail = require("./verifyEmail.routes");
const product = require("./product.routes");
const checkAuth = require("./checkAuth.routes");
const auth = require("./auth.routes");

router.use("/users", userRoute);
router.use("/verifyEmail", verifyEmail);
router.use("/product", product);
router.use("/checkAuth", checkAuth);
router.use("/auth", auth);

module.exports = router;
