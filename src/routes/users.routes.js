const { Router } = require("express");
// router = new Router
const router = Router();
// controller
const { getUserController } = require("../controller/users.controller");

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     description: get all avalible users list
 *     responses:
 *       200:
 *         description: API is running
 */
router.get("/", getUserController);
router.get("/logout", (req, res) => {
  // Clear the JWT from the cookie
  res.clearCookie("token");
  // Send a success message
  res
    .status(200)
    .json({ statusCode: res.statusCode, message: "Successfully logged out" });
});

module.exports = router;
