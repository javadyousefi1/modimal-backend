const { Schema, model } = require("mongoose");
// Define the image subdocument schema without an _id field
const imageSchema = new Schema({
  path: { type: String, required: true, trim: true },
  id: { type: Number, required: true }
}, { _id: false }); // Disable _id for the subdocument
const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  color: { type: [String], required: true, trim: true },
  size: { type: [String], required: true, trim: true },
  offPrice: { type: Number, required: false, trim: true, default: 0 },
  isActive: { type: Boolean, required: true, default: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "category", required: true, trim: true },
  image: { type: imageSchema, required: true } // Use the subdocument schema here
}, { timestamps: true, versionKey: false })

const productModel = model("product", productSchema)

module.exports = { productModel, productSchema }