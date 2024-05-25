const { ObjectId } = require("mongodb");
const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/product.model");
const { checkTokenValid } = require("../utils/token");

const addToCart = async (req, res) => {
    const cookies = req.cookies
    const tokenData = await checkTokenValid(cookies.token);

    const productId = "2";
    const count = 1;
    const userEmail = tokenData?.email
    const timeExpire = Date.now() + (30 * 60 * 1000)


    try {
        const isProductIdValid = await productModel.findOne({ _id: new ObjectId(productId) })
        
        
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
        return res.send("this product avalible in cart")
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
    } else {
        // create cart
        const test = await cartModel.create({ userEmail, cart })
    }


    res.send("users")
};



module.exports = {
    addToCart,

};
