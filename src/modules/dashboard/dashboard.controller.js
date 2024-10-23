const Controller = require('../../common/controllers/controller');
const { orderModel } = require('../order/order.model');
const createError = require("http-errors");
const { paginate, buildSearchQuery } = require('../../utils/helpers');
const dayjs = require('dayjs');
const jalaliday = require('jalaliday'); // Correct plugin

dayjs.extend(jalaliday); // Extend dayjs with jalaliday

class DashboardController extends Controller {
    #orderModel
    constructor() {
        super()
        this.#orderModel = orderModel
    }

    async monthReportOfIncome(req, res, next) {
        try {
            // Get the first day of the current month in Jalali and format it to ISO string
            const startDayOfCurrentMonthJalali = dayjs().calendar('jalali').startOf('month').toISOString();
            const endDayOfCurrentMonthJalali = dayjs().calendar('jalali').endOf('month').add(1, "day").toISOString();

            const query = {
                $gte: `${startDayOfCurrentMonthJalali.slice(0, 11)}23:59:59.000Z`,
                $lte: `${endDayOfCurrentMonthJalali.slice(0, 11)}23:59:59.000Z`,
            }

            const result = await this.#orderModel.find({ createdAt: query, status: 3 }).select('+createdAt');;
            const inThisMonthUntilNow = result.reduce((acc, curr) => acc = acc + curr.totalPrice, 0)


            const data = [...result]

            let array = []


            data.forEach(item => {
                item.order.forEach(innerItem => {
                    const createdAt = new Date(String(item.createdAt)).toISOString().split('T')[0]
                    const alreadyExisted = array.find(existingItem => new Date(String(existingItem.date)).toISOString().split('T')[0] === createdAt);

                    if (alreadyExisted) {
                        const price = (innerItem.offPrice > 0 ? innerItem.offPrice : innerItem.price) * innerItem.count;
                        alreadyExisted.price += price;
                    } else {
                        const price = (innerItem.offPrice > 0 ? innerItem.offPrice : innerItem.price) * innerItem.count;

                        const newRecord = {
                            date: item.createdAt,
                            price
                        };

                        array.push(newRecord);
                    }
                });
            });


            const mostDayIncomeInCurrentMonth = array.sort((a, b) => b.price - a.price)[0] ?? 0


            const statistics = {
                inThisMonthUntilNow,
                mostDayIncomeInCurrentMonth
            }


            res.status(200).json({
                data: statistics,
                statusCode: res.statusCode
            });
        } catch (error) {
            next(error);
        }
    }
    async weekReportOfIncome(req, res, next) {
        try {
            // Get the first day of the current month in Jalali and format it to ISO string
            const sevenDayAgo = dayjs().calendar('jalali').subtract(7, "day").toISOString();
            const today = dayjs().calendar('jalali').toISOString();

            const query = {
                $gte: `${sevenDayAgo.slice(0, 11)}23:59:59.000Z`,
                $lte: `${today.slice(0, 11)}23:59:59.000Z`,
            }

            const result = await this.#orderModel.find({ createdAt: query, status: 3 }).select('+createdAt');;

            const data = [...result]

            const sevenDayObject = dayjs().calendar('jalali').subtract(7, "day")


            let lastData = []

            for (let i = 1; i <= 7; i++) {
                const test = sevenDayObject.add(i, "day")

                const currentDate = test.toISOString().split("T")[0]

                const x = data.filter(item => {
                    const createdAt = new Date(String(item.createdAt)).toISOString().split('T')[0]

                    if (createdAt === currentDate) return item
                })

                lastData.push(x)
            }

            const totalLastSevenDaysPrice = []

            lastData.forEach(item => {
                const totalOfCurrentDate = item.reduce((acc, curr) => acc = acc + curr.totalPrice, 0)
                totalLastSevenDaysPrice.push(totalOfCurrentDate)
            })


            // most item menu
            const report = [];

            data?.forEach((item) => {
                item.order.forEach((innerItem) => {

                    const alreadyExsit = report.find(
                        (item) => item.menuId === innerItem._id
                    );

                    if (alreadyExsit) {
                        alreadyExsit.count = alreadyExsit.count + innerItem?.count;
                    } else {
                        const newRecord = {
                            menuId: innerItem._id,
                            count: innerItem?.count,
                            title: innerItem?.title,
                        };
                        report.push(newRecord);
                    }
                });
            });
            const mostItemMenuResult = report?.sort((a, b) => b.count - a.count)[0];
            console.log(mostItemMenuResult)
            // most item menu


            // most category
            const reportCategory = [];

            data?.forEach((item) => {
                item.order.forEach((innerItem) => {
                    const alreadyExsit = reportCategory.find(
                        (item) => item.categoryId === innerItem.categoryId._id
                    );

                    if (alreadyExsit) {
                        alreadyExsit.count = alreadyExsit.count + 1;
                    } else {
                        const newRecord = {
                            categoryId: innerItem.categoryId._id,
                            count: 1,
                            title: innerItem?.categoryId?.title,
                        };
                        reportCategory.push(newRecord);
                    }
                });
            });

            const resultWeekCategory = reportCategory?.sort((a, b) => b.count - a.count)[0];

            // most category


            const weekData = {
                lastSevenDaysIncome: totalLastSevenDaysPrice,
                mostItemMenu: mostItemMenuResult??[],
                mostCategoryMenu: resultWeekCategory??[],
            }

            res.status(200).json({
                data: weekData,
                statusCode: res.statusCode
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = { DashboardController: new DashboardController() };
