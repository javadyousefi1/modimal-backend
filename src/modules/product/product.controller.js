const { default: mongoose, isValidObjectId } = require('mongoose');
// controllers
const { CategoryController } = require("../category/category.controller.js")
const Controller = require('../../common/controllers/controller.js')
// model
const { productModel } = require('./product.model.js')
// error handling
const createError = require("http-errors");
// fs
const fs = require('fs');
// path
const path = require('path');
const { paginate, buildSearchQuery } = require('../../utils/helpers.js');
const { getSocket } = require('../../socket/socketHandler.js');
class ProductController extends Controller {

    #model
    #CategoryController
    constructor() {
        super()
        this.#model = productModel
        this.#CategoryController = CategoryController
    }

    async addNewMenu(req, res, next) {
        try {
            const { title, text, categoryId, isActive, price, offPrice, color, size } = req.body;

            if (!req.file) {
                throw new createError.BadRequest('A file is required for this operation')
            }
            // check category id is valid or not
            await this.#CategoryController.isCategoryidAlreadyExistsById(categoryId, next)

            const fileUrl = `/uploads/${req.file.filename}`;

            const newMenu = { text, title, categoryId, isActive, price, offPrice, image: { path: fileUrl, id: req.imageId }, color, size };

            // prevent dublicate blogs
            const alreadyExsitWithThisTitle = await this.#model.countDocuments({ title })
            if (alreadyExsitWithThisTitle !== 0) throw new createError.BadRequest("menu already exists with this title")
            // create menu                 
            const newMenuCreated = await this.#model.create(newMenu);
            // send signal
            // Get Socket.io instance and emit an event
            // const io = await getSocket();
            // await io.emit('menuChanged', { categoryId });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "menu added successfully",
                data: newMenuCreated
            })
        } catch (error) {
            let imagePath = path.join(__dirname, `../../../uploads/${req.fileName}`)
            if (fs.existsSync(imagePath)) {
                await fs.unlinkSync(imagePath);
            }
            next(error)
        }
    }

    async getAllMenus(req, res, next) {
        try {
            const { pageSize, pageIndex, search } = req.query
            // Use the helper to build the search query
            const searchQuery = buildSearchQuery(search);

            const paginateData = await paginate(this.#model, searchQuery, pageSize, pageIndex, [
                { path: 'categoryId', select: 'title _id' }, // Include only the 'title' of the category
            ])

            res.status(200).json({
                statusCode: res.statusCode,
                message: "all menu resived successfully",
                ...paginateData
            })
        } catch (error) {
            next(error)
        }
    }


    async getMenuById(req, res, next) {

        try {
            const { id } = req.query;
            if (!id) next(createError.BadRequest("you dont sent id !"))

            const reuslt = await this.isMenuidAlreadyExistsById(id, next)


            res.status(200).json({
                statusCode: res.statusCode,
                message: "Menu gets successfully",
                data: reuslt
            })
        } catch (error) {
            next(error)
        }
    }


    async updateMenu(req, res, next) {
        try {
            const { title, text, categoryId, isActive, price, offPrice, id } = req.body;
            const updatedCategory = { title, _id: id, isActive, text, categoryId, price, offPrice };
            const prevData = await this.isMenuidAlreadyExistsById(id, next)
            // check category id is valid or not
            await this.#CategoryController.isCategoryidAlreadyExistsById(categoryId, next)
            console.log(prevData)
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

            await this.#model.updateOne({ _id: id }, { $set: updatedCategory });

            // Get Socket.io instance and emit an event
            const io = await getSocket();
            await io.emit('menuChanged', { categoryId });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }


    async deleteMenu(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) next(createError.BadRequest("you dont sent id !"))
            const willBeDeletedMenu = await this.isMenuidAlreadyExistsById(id, next)
            console.log(willBeDeletedMenu)
            const blogs = await this.#model.deleteOne({ _id: id });
            // delete image
            const blogImageName = willBeDeletedMenu?.image?.path.split("/").at(-1)
            let imagePath = path.join(__dirname, `../../../uploads/${blogImageName}`)
            if (fs.existsSync(imagePath)) {
                await fs.unlinkSync(imagePath);
            }


            // Get Socket.io instance and emit an event
            // const io = await getSocket();
            // await io.emit('menuChanged', { categoryId: willBeDeletedMenu?.categoryId });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "menu deleted successfully",
                // data: blogs._id
            })
        } catch (error) {
            next(error)
        }
    }

    async toggleMenuStatus(req, res, next) {
        try {
            const { menuId } = req.body
            if (!isValidObjectId(menuId)) throw new createError.BadRequest("your menu id is not valid")
            const prevData = await this.isMenuidAlreadyExistsById(menuId, next)
            await this.#model.findOneAndUpdate(
                { _id: menuId }, // Filter to find the user by ID
                [
                    {
                        $set: {
                            isActive: { $not: "$isActive" } // Toggle the isActive field
                        }
                    }
                ],
                { new: true } // Return the updated document
            );

            // Get Socket.io instance and emit an event
            // const io = await getSocket();
            // await io.emit('menuChanged', { categoryId: prevData.categoryId });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "menu status changed successfully",
            })
        } catch (error) {
            next(error)
        }
    }


    async isExsitedMenuByCategoryId(id, next = () => { }) {
        try {

            res.send("ok")
            // if (!isValidObjectId(id)) throw new createError.BadRequest("your id is not valid")
            // const foundMenu = await this.#model.findOne({ _id: id })
            // if (!foundMenu) {
            //     throw new createError.NotFound("not found a menu with this id !")
            // } else {
            //     return foundMenu
            // }
        } catch (error) {
            next(error)
        }
    }

    async isMenuidAlreadyExistsById(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your id is not valid")
            const foundMenu = await this.#model.findOne({ _id: id })
            if (!foundMenu) {
                throw new createError.NotFound("not found a menu with this id !")
            } else {
                return foundMenu
            }
        } catch (error) {
            next(error)
        }
    }



    // comments
    async addComment(req, res, next) {
        try {
            const { blogId, comment } = req.body
            const commentObject = { comment: comment, _id: new mongoose.Types.ObjectId(), isChecked: false, reply: null, name: req.user.name, email: req.user.email }
            await this.isMenuidAlreadyExistsById(blogId, next)
            const updateMenuComment = await this.#model.updateOne({ _id: blogId }, { $push: { comments: commentObject } })
            res.status(200).json({
                statusCode: res.statusCode,
                message: "comment added successfully !"
            })
        } catch (error) {
            next(error)
        }
    }

    async replyComment(req, res, next) {
        try {
            const { blogId, commentId, reply } = req.body
            await this.isMenuidAlreadyExistsById(blogId, next)

            const repltObject = { userId: req.user._id, replyText: reply, isChecked: true }

            await this.#model.updateOne(
                { _id: blogId, 'comments._id': commentId },
                { $set: { 'comments.$.reply': repltObject } }
            );
            res.status(200).json({
                statusCode: res.statusCode,
                message: "replyed comment successfully !"
            })
        } catch (error) {
            next(error)
        }
    }

    async verifyComment(req, res, next) {
        try {
            const { blogId, commentId } = req.body
            await this.isMenuidAlreadyExistsById(blogId, next)
            await this.#model.updateOne(
                { _id: blogId, 'comments._id': commentId },
                { $set: { 'comments.$.isChecked': true } }
            );
            res.status(200).json({
                statusCode: res.statusCode,
                message: "comment verify successfully !"
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { blogId, commentId } = req.query
            await this.isMenuidAlreadyExistsById(blogId, next)

            const result = await this.#model.updateOne(
                { _id: blogId },
                { $pull: { comments: { _id: commentId } } }
            );

            if (result.matchedCount === 0) {
                throw new createError.NotFound('Comment not found')
            }

            res.status(200).json({
                statusCode: res.statusCode,
                message: 'Comment removed successfully'
            })


        } catch (error) {
            next(error)
        }
    }

    // like
    // async likeMenu(req, res, next) {
    //     try {
    //         const userId = req.user._id;
    //         const { blogId } = req.body;

    //         await this.isMenuidAlreadyExistsById(blogId, next)

    //         const menu = await this.#model.findById(blogId).select('+likes');
    //         const hasLiked = menu.likes.includes(userId);


    //         if (hasLiked) {
    //             // Remove the user's ID from the likes array
    //             await this.#model.findByIdAndUpdate(blogId, { $pull: { likes: userId } });
    //             res.status(200).json({
    //                 statusCode: res.statusCode,
    //                 message: 'Unlike successful'
    //             })
    //         } else {
    //             // Add the user's ID to the likes array
    //             await this.#model.findByIdAndUpdate(blogId, { $push: { likes: userId } });
    //             res.status(200).json({
    //                 statusCode: res.statusCode,
    //                 message: "Like successful"
    //             })
    //         }

    //     } catch (error) {
    //         next(error)
    //     }
    // }

}


module.exports = { ProductController: new ProductController() }