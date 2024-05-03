const { Router } = require("express");
const authRoutes = require("./register.route");
const router = Router();

router.use("/register", authRoutes);

module.exports = router;
