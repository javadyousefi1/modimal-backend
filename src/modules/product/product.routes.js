// multer
const multer = require('multer');
// guards
const { isAuthorized, checkIsAdmin } = require("../../common/guards/auth.guard");
// controller
const { ProductController } = require("./product.controller");
// router
const router = require("express").Router();

// Configure multer storage

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
            cb(new Error('فقط پسو.ند های عکس مورد تایید است'), false);
        }
    }
});

router.post("/create-product", upload.array("file", 4), ProductController.addNewMenu)
router.put("/update-product", upload.single('file'), ProductController.updateMenu)
router.get("/get-all-products", ProductController.getAllMenus)
router.get("/get-product-byId", ProductController.getMenuById)
router.delete("/delete-product", ProductController.deleteMenu)
router.patch("/toggle-product-status", ProductController.toggleMenuStatus)
// router.post("/add-comment", isAuthorized, MenuController.addComment)
// router.post("/reply-comment", isAuthorized, MenuController.replyComment)
// router.delete("/delete-comment", isAuthorized, MenuController.deleteComment)
// router.post("/like-blog", isAuthorized, MenuController.likeBLog)
// router.post("/verify-comment", checkIsAdmin, MenuController.verifyComment)

module.exports = {
    productRoutes: router
}