const { isValidObjectId, default: mongoose } = require('mongoose');
const Controller = require('../../common/controllers/controller.js')
// model
const { categoryModel } = require('./category.model.js')
const { menuModel } = require('../product/product.model.js')
// error handling
const createError = require("http-errors");
// path
const path = require('path');
const fs = require('fs');
const { paginate, buildSearchQuery } = require('../../utils/helpers.js');
class CategoryController extends Controller {
    #model
    #menuModel
    constructor() {
        super()
        this.#model = categoryModel
        this.#menuModel = menuModel
    }

    async addNewCategory(req, res, next) {
        try {
            // get data from body
            const { title, isActive } = req.body;
            // check file is already exsited or not
            if (!req?.file) throw new createError.BadRequest("file not sent")
            // fileUrl
            const fileUrl = `/uploads/${req?.file?.filename}`;
            const order = await this.#model.countDocuments({}) + 1
            const newCategory = { title, image: { path: fileUrl, id: req.imageId }, isActive, order };

            // check dublicate
            const isAlreadyExist = await this.#model.countDocuments({ title: title.trim() })
            if (isAlreadyExist) return res.status(400).json({ statusCode: res.statusCode, message: "this category already exists !" })
            // insert new category to DB
            const newCategoryCreated = await this.#model.create(newCategory);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category added successfully",
                data: newCategoryCreated
            })
        } catch (error) {
            let imagePath = path.join(__dirname, `../../../uploads/${req.fileName}`)
            if (fs.existsSync(imagePath)) {
                await fs.unlinkSync(imagePath);
            }
            next(error)
        }
    }

    async updateCategory(req, res, next) {
        const { title, id, isActive } = req.body;
        const updatedCategory = { title, _id: id, isActive };
        const prevData = await this.isCategoryidAlreadyExistsById(id, next)
        try {

            let imagePath;

            if (req.file) {
                const fileUrl = `/uploads/${req?.fileName}`;
                updatedCategory.image = { path: fileUrl, id: req.imageId };

                imagePath = path.join(__dirname, `../../../uploads/${prevData?.image.path.split("/").pop()}`);
                if (fs.existsSync(imagePath)) {
                    await fs.unlinkSync(imagePath);
                }
            } else {
                updatedCategory.image = prevData?.image;
            }
            const result = await this.#model.updateOne({ _id: id }, { $set: updatedCategory });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }


    async getAllCategorys(req, res, next) {
        try {
            const { pageSize, pageIndex, search } = req.query;

            // Use the helper to build the search query
            const searchQuery = buildSearchQuery(search);

            const paginateData = await paginate(this.#model, searchQuery, pageSize, pageIndex);

            res.status(200).json({
                statusCode: res.statusCode,
                message: "all Category resived successfully",
                ...paginateData
            })
        } catch (error) {
            next(error)
        }
    }


    async getCategoryById(req, res, next) {

        try {
            const { id } = req.query;
            if (!id) next(createError.BadRequest("you dont sent id !"))

            const reuslt = await this.isCategoryidAlreadyExistsById(id, next)


            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category gets successfully",
                data: reuslt
            })
        } catch (error) {
            next(error)
        }
    }


    async deleteCategory(req, res, next) {

        try {
            const { id } = req.query;
            if (!id) next(createError.BadRequest("you dont sent id !"))
            const isExsitedMenu = await this.#menuModel.countDocuments({ categoryId: id });

            const willBeDeletedBlog = await this.isCategoryidAlreadyExistsById(id, next)
            if (isExsitedMenu > 0) throw new createError.BadRequest("در منو آیتمی با این دسته بندی درج شده است")
            const Categorys = await this.#model.deleteOne({ _id: id });
            // delete image
            const blogImageName = willBeDeletedBlog?.image?.path.split("/").at(-1)
            let imagePath = path.join(__dirname, `../../../uploads/${blogImageName}`)
            if (fs.existsSync(imagePath)) {
                await fs.unlinkSync(imagePath);
            }

            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category deleted successfully",
                data: Categorys._id
            })
        } catch (error) {
            next(error)
        }
    }


    async toggleCategoryStatus(req, res, next) {
        try {
            const { categoryId } = req.body
            if (!isValidObjectId(categoryId)) throw new createError.BadRequest("your category id is not valid")

            await this.#model.findOneAndUpdate(
                { _id: categoryId }, // Filter to find the user by ID
                [
                    {
                        $set: {
                            isActive: { $not: "$isActive" } // Toggle the isActive field
                        }
                    }
                ],
                { new: true } // Return the updated document
            );

            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category status changed successfully",
            })
        } catch (error) {
            next(error)
        }
    }

    async isCategoryidAlreadyExistsById(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your category id is not valid")
            const foundBlog = await this.#model.findOne({ _id: id })
            if (!foundBlog) {
                throw new createError.NotFound("not found a category with this id !")
            } else {
                return foundBlog
            }
        } catch (error) {
            next(error)
        }
    }
}


module.exports = { CategoryController: new CategoryController() }