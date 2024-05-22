const path = require("path");
const fs = require("fs");
// model
const { prodcutModel } = require("../models/product.model");

const productController = async (req, res) => {
  const time = new Date().getTime();

  const { productName, count, describtion, price, size, color } = req.body;

  if (!(Array.isArray(JSON.parse(size)) && Array.isArray(JSON.parse(color)))) {
    return res.status(400).json({
      status: res.statusCode,
      message: "size or color is not an array type",
      data: null,
    });
  }
  // check file is exsits
  if (!req.files) {
    return res.status(400).json({
      status: res.statusCode,
      message: "banner is required",
      data: null,
    });
  } else if (!Object.keys(req.files).includes(...["banner"])) {
    return res.send({
      status: res.statusCode,
      message: "banner is required",
      data: null,
    });
  }

  const bannerFile = req.files.banner;
  const extName = path.extname(bannerFile?.name);
  const uniqueId = new Date().getTime();

  // Define the path two directories back from the current directory
  const uploadFolderPath = path.join(__dirname, "../../");

  // Specify the name of the new directory you want to create
  const uploadDirName = "uploads";

  // Construct the full path to the new directory
  const newDirectoryPath = path.join(uploadFolderPath, uploadDirName);

  try {
    fs.mkdirSync(newDirectoryPath, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory: ${error}`);
  }

  const fileName = uniqueId + "-" + "product" + extName;
  // file url on host
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

  // file url in os
  const uploadedPath1 = path.join(__dirname, "../../", "uploads", fileName);
  bannerFile.mv(uploadedPath1);

  const newProduct = await prodcutModel.create({
    bannerUrl: fileUrl,
    productName,
    count,
    createdAt: time,
    describtion,
    price,
    size: JSON.parse(size),
    color: JSON.parse(color),
  });

  res.status(200).json({
    statusCode: res.statusCode,
    message: "product added succsesfully",
    data: newProduct
  });
};

module.exports = { productController };
