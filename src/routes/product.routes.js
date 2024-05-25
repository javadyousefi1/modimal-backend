const { Router } = require("express");
const router = Router();
// controller
const { productController, getAllproducts, getProductById } = require("../controller/product.controller");
// middleware
const { validate } = require("../middlewares/validatorHandler");
// schema
const { productSchema } = require("../validators/product.validator");

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - product
 *     summary: Create a new product
 *     description: Create a new product with a banner image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *               count:
 *                 type: integer
 *                 description: Quantity of the product
 *               describtion:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the product
 *               size:
 *                 type: string
 *                 description: Size of the product (JSON string)
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Banner image of the product
 *     responses:
 *       '200':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 describtion:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 size:
 *                   type: string
 *                 bannerUrl:
 *                   type: string
 *                   description: URL of the uploaded banner image
 *       '400':
 *         description: Bad request, banner image is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */

router.post("/", validate(productSchema), productController);
router.get("/", getAllproducts);
// router.get("/:id", getProductById);

module.exports = router;
