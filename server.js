// express
const express = require("express");
// body parser
const bodyParser = require("body-parser");
const app = express();
// path
const path = require("path");
// uploader
const fileUpload = require("express-fileupload");
// routes
const router = require("./src/routes");
// env
require("dotenv").config();
// db
require("./src/config/mongo.config");
// port
const PORT = process.env.PORT || 3000;
// error handler
const { notFound, errorHandler } = require("./src/middlewares/errorHandlers");
// cors
var cors = require("cors");
// swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { validate } = require("./src/middlewares/validatorHandler");
const { productSchema } = require("./src/validators/product.validator");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Modimal Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://modimal-shop.runflare.run",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Enable CORS for all routes
app.use(cors());
// file uploader
app.use(fileUpload());
// routers
app.use(router);

// global middlewares
app.use(express.json());
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Serve static files from the 'upload' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your upload route
app.post("/uploads", validate(productSchema), async (req, res) => {
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
  const uploadUrl = `${__dirname}/uploads/products/product-${
    uniqueId + extName
  }`;
  bannerFile.mv(uploadUrl);
  res.send(req.body);
});

// error handlers
app.use(notFound);
app.use(errorHandler);

// run app
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
