const { isValidObjectId } = require('mongoose');
const Controller = require('../../common/controllers/controller')
// model
const { waiterModel } = require('./waiter.model')
// error handling
const createError = require("http-errors");
const { paginate } = require('../../utils/helpers');
const { getSocket } = require('../../socket/socketHandler');

class waiterController extends Controller {
    #model
    constructor() {
        super()
        this.#model = waiterModel
    }

    async addNewWaiter(req, res, next) {
        try {
            // get data from body
            const { deskNumber } = req.body;
            const newwaiter = { deskNumber };
            // insert new waiter to DB
            const newWaiterCreated = await this.#model.create(newwaiter);


            // Get Socket.io instance and emit an event
            const io = await getSocket();
            await io.emit('waiterAdded', newWaiterCreated);

            res.status(200).json({
                statusCode: res.statusCode,
                message: "waiter added successfully",
                data: newWaiterCreated
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllwaiters(req, res, next) {
        try {
            const { pageSize, pageIndex } = req.query;

            // Get today's date
            const today = new Date().setHours(0, 0, 0,);

            // Delete all data created before today
            await this.#model.deleteMany({
                createdAt: {
                    $lt: today
                }
            });

            // Paginate the remaining data
            const paginateData = await paginate(this.#model, {}, pageSize, pageIndex);

            res.status(200).json({
                statusCode: res.statusCode,
                message: "All waiters received successfully",
                ...paginateData
            });
        } catch (error) {
            next(error);
        }
    }


    async deletewaiter(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) throw new createError.BadRequest("you dont sent id !")
            await this.isWaiteridAlreadyExistsById(id, next)
            const waiters = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "waiter deleted successfully",
                data: waiters._id
            })
        } catch (error) {
            next(error)
        }
    }

    async isWaiteridAlreadyExistsById(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your waiter id is not valid")
            const foundBlog = await this.#model.countDocuments({ _id: id })
            if (!foundBlog) throw new createError.NotFound("not found a waiter with this id !")
        } catch (error) {
            next(error)
        }
    }

}


module.exports = { waiterController: new waiterController() }