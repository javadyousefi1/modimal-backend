const { Router } = require("express");
const router = Router();
// controller
const { productController } = require("../controller/product.controller");
// middleware
const { validate } = require("../middlewares/validatorHandler");
// schema
const { productSchema } = require("../validators/product.validator");

router.post("/", validate(productSchema), productController);

module.exports = router;
