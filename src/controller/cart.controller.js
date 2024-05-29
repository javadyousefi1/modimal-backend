const { ObjectId } = require("mongodb");
const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/product.model");
const { checkTokenValid } = require("../utils/token");

const addToCart = async (req, res) => {
    const { productId, count } = req.body
    const cookies = req.cookies;

    let userData = null;
    try {
        userData = await checkTokenValid(cookies.token);
    } catch (err) {
        return res.status(400).json({
            statusCode: res.statusCode,
            message: "you need to login for adding cart"
        })
    }

    // const productId = "664e252de9b0763c86a4caed";
    // const count = 10;
    const userEmail = userData?.email
    const timeExpire = Date.now() + (30 * 60 * 1000)


    try {
        const isProductIdValid = await productModel.findOne({ _id: productId })
        // prevent add to cart if count more than data base
        if (typeof count !== "number" || count > isProductIdValid?.count) {
            return res.status(400).json({
                statusCode: res.statusCode,
                message: "count more thant avalible product on database or count is not a number"
            })
        } else {

            // here write a code if not avalible true in order data base reverse the countّ
        }

    } catch (err) {
        return res.status(404).json({
            statusCode: res.statusCode,
            message: "product id is not valid"
        })
    }


    const avalibleInCart = await cartModel.countDocuments({
        'cart.productId': productId
    });

    if (avalibleInCart !== 0) {
        return res.status(400).json({
            statusCode: res.statusCode,
            message: "this product avalible in cart"
        })
    }



    const cart = {
        productId,
        count,
        timeExpire,
        createdAt: new Date().getTime()
    }

    const userHaveCart = await cartModel.countDocuments({ userEmail })

    if (userHaveCart !== 0) {
        // update cart if already exists
        const test = await cartModel.findOneAndUpdate({ userEmail }, { $push: { cart } })
        return res.status(200).json({ statusCode: 200, message: "add to cart successfully" })
    } else {
        // create cart

        await cartModel.create({ userEmail, cart });
        return res.status(200).json({ statusCode: 200, message: "add to cart successfully" })

    }


};



module.exports = {
    addToCart,

};
