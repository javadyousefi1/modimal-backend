const { ObjectId } = require("mongodb");
const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/product.model");
const { checkTokenValid } = require("../utils/token");

const addToCart = async (req, res) => {
    const cookies = req.cookies;
    const { productId, color, size } = req.body;
    const count = 1; // default be one

    let userEmail = null;
    try {
        const tokenData = await checkTokenValid(cookies.token);
        userEmail = tokenData?.email;
        if (!userEmail) throw new Error('User email not found');
    } catch (err) {
        return res.status(400).json({
            statusCode: res.statusCode,
            message: err.message || "you need to login for adding cart"
        });
    }

    try {
        const isProductIdValid = await productModel.findOne({ _id: productId });
        if (!isProductIdValid) throw new Error('Product ID is not valid');

        if (typeof count !== "number" || count > isProductIdValid.count) {
            return res.status(400).json({
                statusCode: res.statusCode,
                message: "Count more than available product on database or count is not a number"
            });
        }
    } catch (err) {
        return res.status(404).json({
            statusCode: res.statusCode,
            message: err.message
        });
    }

    const avalibleInCart = await cartModel.countDocuments({
        'cart.productId': productId,
        'cart.color': color,
        'cart.size': size,
    });

    if (avalibleInCart !== 0) {
        return res.status(400).json({
            statusCode: res.statusCode,
            message: "This product with this color and size is available in cart"
        });
    }

    const cart = {
        productId,
        count,
        color,
        size,
        createdAt: new Date().getTime()
    };

    const userHaveCart = await cartModel.countDocuments({ userEmail });
    if (userHaveCart === 0) {
        const newItemInCart = await cartModel.create({ userEmail, cart });
        return res.status(200).json({ statusCode: 200, message: "Add to cart successfully", data: newItemInCart.cart });
    } else {
        // Update cart if already exists
        const updatedCart = await cartModel.findOneAndUpdate(
            { userEmail },
            { $push: { cart } },
            { new: true } // Return the updated document
        );
        return res.status(200).json({ statusCode: 200, message: "Update cart successfully", data: updatedCart.cart });
    }
};

const getAllCartByUser = async (req, res) => {
    const cookies = req.cookies;

    let userEmail = null;
    try {
        const tokenData = await checkTokenValid(cookies.token);
        userEmail = tokenData?.email.toLowerCase();
        if (!userEmail) throw new Error('User email not found');
    } catch (err) {
        return res.status(400).json({
            statusCode: res.statusCode,
            message: err.message || "you need to login for adding cart"
        });
    }


    try {
        const userHaveCart = await cartModel.countDocuments({ userEmail })
        if (userHaveCart === 0) return res.status(200).json({ statusCode: res.statusCode, message: "user cart is empty", data: [] });

        const getAllProducts = await productModel.find({})

        const { cart } = await cartModel.findOne({
            userEmail,
        }).select("-_id").select("-userEmail");

        const cartData = []

        await cart.forEach(item => {
            let obj = item
            const findTheProduct = [...getAllProducts].find(innerItem => innerItem._id.equals(new ObjectId(item.productId)));
            obj.productName = findTheProduct.productName;
            obj.bannerUrl = findTheProduct.bannerUrl;
            obj.price = findTheProduct.price;
            cartData.push(item)
        })


        res.status(200).json({
            statusCode: res.statusCode,
            message: "get all cart by user succsesfully",
            data: cartData
        });
    } catch (err) {
        res.status(400).json({
            statusCode: res.statusCode,
            message: err.message || "get all cart fail"
        });
    }


};

module.exports = {
    addToCart, getAllCartByUser
};
