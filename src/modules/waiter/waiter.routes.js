const router = require("express").Router();
// controllers
const { waiterController } = require("./waiter.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")

router.post("/create-waiter", checkIsAdmin,waiterController.addNewWaiter)
router.get("/get-all-waiters", checkIsAdmin, waiterController.getAllwaiters)
router.delete("/delete-waiter", checkIsAdmin, waiterController.deletewaiter)

module.exports = {
    waiterRoutes: router
}