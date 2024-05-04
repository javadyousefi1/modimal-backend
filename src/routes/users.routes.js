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

module.exports = router;
