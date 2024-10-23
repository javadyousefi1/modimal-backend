// multer
const multer = require('multer');
// router
const router = require("express").Router();
// controllers
const { CategoryController } = require("./category.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const now = new Date().getTime();
        const name = `${now}.${file.originalname.split(".").at(-1)}`
        req.fileName = name
        req.imageId = now
        cb(null, name);
    }
});

const maxSize = 1048576;

const upload = multer({
    storage: storage, limits: {
        fileSize: maxSize
    }, fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type just accept image types !'), false);
        }
    }
});


router.post("/create-category", CategoryController.addNewCategory)
router.put("/update-category",  CategoryController.updateCategory)
router.patch("/toggle-category-status",  CategoryController.toggleCategoryStatus)
router.get("/get-all-categories",  CategoryController.getAllCategorys)
router.get("/get-category-byId",  CategoryController.getCategoryById)
router.delete("/delete-Category",  CategoryController.deleteCategory)

module.exports = {
    categoryRoutes: router
}