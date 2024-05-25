const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    cart: {
      type: [],
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const cartModel = model("cart", cartSchema, "cart");

module.exports = {
  cartModel,
};
