const router = require("express").Router();
// controllers
const { DashboardController } = require("./dashboard.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")

router.get("/month-report-income", DashboardController.monthReportOfIncome)
router.get("/week-report-income", DashboardController.weekReportOfIncome)

module.exports = {
    DashboardRoutes: router
}