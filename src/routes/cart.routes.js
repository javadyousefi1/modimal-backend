const { Router } = require("express");
const { addToCart } = require("../controller/cart.controller");
const router = Router();


router.post("/", addToCart);

module.exports = router;
