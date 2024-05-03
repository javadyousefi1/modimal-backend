const { Schema, model } = require("mongoose");

const prodcutSchema = new Schema(
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
    bannerUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const prodcutModel = model("product", prodcutSchema, "products");

module.exports = {
  prodcutModel,
};
