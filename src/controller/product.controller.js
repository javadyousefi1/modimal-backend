const path = require("path");
const fs = require("fs");
const { productModel } = require("../models/product.model");
const { validateArrayField } = require("../utils/verifyArray")

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const productController = async (req, res) => {
  const time = new Date().getTime();
  const { productName, count, describtion, price, size, color } = req.body;


  try {
    // Validate size and color fields
    const parsedSize = validateArrayField(size, "size", res);
    if (!parsedSize) return;

    const parsedColor = validateArrayField(color, "color", res);
    if (!parsedColor) return;


    const bannerFile = req.files.banner;
    const extName = path.extname(bannerFile.name);
    const uniqueId = new Date().getTime();
    const fileName = `${uniqueId}-product${extName}`;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    const uploadedPath = path.join(UPLOADS_DIR, fileName);

    createDirectory(UPLOADS_DIR);

    bannerFile.mv(uploadedPath, async (err) => {
      if (err) {
        return res.status(500).json({
          status: res.statusCode,
          message: "Failed to upload file",
          data: null,
        });
      }

      const newProduct = await productModel.create({
        bannerUrl: fileUrl,
        productName,
        count,
        createdAt: time,
        describtion,
        price,
        size: parsedSize,
        color: parsedColor,
      });

      res.status(200).json({
        statusCode: res.statusCode,
        message: "Product added successfully",
        data: newProduct,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: "Internal server error",
      data: null,
    });
  }
};


const getAllproducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.status(200).json({
      status: res.statusCode,
      message: "get all products successfully",
      data: products,
    })
  } catch (error) {
    res.send(error)
  }
}

module.exports = { productController, getAllproducts };
