const { Router } = require("express");
const { addToCart, getAllCartByUser } = require("../controller/cart.controller");
const router = Router();


router.post("/addToCart", addToCart);
router.get("/getAllCartByUser", getAllCartByUser);

module.exports = router;
