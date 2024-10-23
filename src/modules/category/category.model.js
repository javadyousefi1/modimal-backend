const { Schema, model } = require("mongoose");

// Define the image subdocument schema without an _id field
const imageSchema = new Schema({
  path: { type: String, required: true, trim: true },
  id: { type: Number, required: true }
}, { _id: false }); // Disable _id for the subdocument

// Define the main category schema
const categorySchema = new Schema({
  title: { type: String, required: true, trim: true },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true, versionKey: false });

const categoryModel = model("category", categorySchema);

module.exports = { categoryModel };
