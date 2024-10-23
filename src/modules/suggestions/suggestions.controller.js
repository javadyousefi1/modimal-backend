const { isValidObjectId } = require('mongoose');
const Controller = require('../../common/controllers/controller')
// model
const { suggestionsModel } = require('./suggestions.model')
// error handling
const createError = require("http-errors");
const { paginate, buildSearchQuery } = require('../../utils/helpers');

class SuggestionsController extends Controller {
    #model
    constructor() {
        super()
        this.#model = suggestionsModel
    }

    async addNewSuggestions(req, res, next) {
        try {
            // get data from body
            const { subject, text } = req.body;
            const newSuggestions = { subject, text };
            // check dublicate
            // const isAlreadyExist = await this.#model.countDocuments({ subject: subject.trim(), text })
            // if (isAlreadyExist) throw new createError.BadRequest("this suggestions already exists !")
            // insert new suggestions to DB
            const newSuggestionsCreated = await this.#model.create(newSuggestions);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Suggestions added successfully",
                data: newSuggestionsCreated
            })
        } catch (error) {
            next(error)
        }
    }


    async getAllSuggestionss(req, res, next) {
        try {
            const { pageSize, pageIndex, search } = req.query;

            // Use the helper to build the search query
            const searchQuery = buildSearchQuery(search,"subject");

            const paginateData = await paginate(this.#model, searchQuery, pageSize, pageIndex);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all Suggestions resived successfully",
                ...paginateData
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteSuggestions(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) throw new createError.BadRequest("you dont sent id !")
            await this.isSuggestionsidAlreadyExistsById(id, next)
            const Suggestionss = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Suggestions deleted successfully",
                data: Suggestionss._id
            })
        } catch (error) {
            next(error)
        }
    }

    async isSuggestionsidAlreadyExistsById(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your suggestions id is not valid")
            const foundBlog = await this.#model.countDocuments({ _id: id })
            if (!foundBlog) throw new createError.NotFound("not found a suggestions with this id !")
        } catch (error) {
            next(error)
        }
    }

    async isSuggestionsListValid(list, next = () => { }) {
        try {
            console.log(list)
            if (Array.isArray(list)) {
                list.forEach(async (lId) => {
                    try {
                        if (!isValidObjectId(lId)) throw new createError.BadRequest("your suggestions id is not valid")
                        const result = await this.#model.countDocuments({ _id: lId })
                        if (result === 0) throw new createError.BadRequest("not found suggestions id")
                    } catch (e) {
                        next(e)
                    }
                })
            } else {
                throw new createError.BadRequest("pass an array for suggestions")
            }


        } catch (error) {
            next(error)
        }
    }
}


module.exports = { SuggestionsController: new SuggestionsController() }