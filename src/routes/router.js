const {productRoutes  } = require("../modules/product/product.routes");
const { categoryRoutes } = require("../modules/category/category.routes");
const { suggestionRoutes } = require("../modules/suggestions/suggestions.routes");
const { userRoutes } = require("../modules/user/user.routes");
const { toolsRoutes } = require("../modules/tools/tools.routes");
const { reservationRoutes } = require("../modules/reservation/reservation.routes");
const { waiterRoutes } = require("../modules/waiter/waiter.routes");
const { orderRoutes } = require("../modules/order/order.routes");
const { frontOfficeRoutes } = require("../modules/frontOffice/frontOffice.routes");
const { default: axios } = require("axios");
const HolidayAPI = require('holidayapi');
const { DashboardRoutes } = require("../modules/dashboard/dashboard.routes");
const { captchaRoutes } = require("../modules/captcha/captcha.routes");
const dayjs = require("dayjs");
const router = require("express").Router();
const jalaliday = require('jalaliday'); // Correct plugin

dayjs.extend(jalaliday);
router.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to Javad app :)" })
});

router.use("/user", userRoutes)
router.use("/category", categoryRoutes)
router.use("/product", productRoutes)
router.use("/suggestion", suggestionRoutes)
router.use("/tools", toolsRoutes)
router.use("/reservation", reservationRoutes)
router.use("/waiter", waiterRoutes)
router.use("/order", orderRoutes)
router.use("/frontoffice", frontOfficeRoutes)
router.use("/dashboard", DashboardRoutes)
router.use("/captcha", captchaRoutes)


router.get('/fetch-holidays', async (req, res) => {
    try {
        const { year, month } = req.query;

        if (!year || !month) {
            return res.status(400).json({ error: 'Year and month are required.' });
        }

        // Convert to Jalali calendar
        const startDate = dayjs(`${year}-${month}-01`);
        const daysInMonth = 31 || startDate.daysInMonth();

        const requests = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDate = startDate.date(day).format('YYYY/MM/DD');
            const url = `https://holidayapi.ir/jalali/${formattedDate}`;

            // Push the axios request promise to array
            requests.push(axios.get(url));
        }

        // Execute all requests in parallel
        const results = await Promise.allSettled(requests);

        // Extract status and data from results
        const data = results.map((result, index) => ({
            day: `${index + 1}`,
            status: result.status,
            data: result.status === 'fulfilled' ? result.value.data : null,
            error: result.status === 'rejected' ? result.reason : null
        }));

        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = {
    allRoutes: router,
};
