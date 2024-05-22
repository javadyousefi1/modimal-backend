const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      type: Number,
      required: true,
      trim: true,
    },
    describtion: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Number,
      required: true,
      trim: true,
    },
    size: {
      type: [String],
      required: true,
      trim: true,
    },
    color: {
      type: [String],
      required: true,
      trim: true,
    },
    bannerUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const productModel = model("product", productSchema, "products");

module.exports = {
  productModel,
};
