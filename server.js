// express
const express = require("express");
const app = express();
// body parser
const bodyParser = require("body-parser");
// cookie parser
const cookieParser = require("cookie-parser");
//serve
const serveIndex = require("serve-index");
const serveFavIcon = require("serve-favicon");
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
//cookie
app.use(cookieParser());
// Enable CORS for all routes
const url =
  process.env.MODE === "development"
    ? process.env.CORS_URL_DEV
    : process.env.CORS_URL_PRO;
app.use(
  cors({
    origin: url, // Adjust this to match your client's origin
    credentials: true,
  })
);
// file uploader
// app.use(fileUpload());

// fav icon
app.use(serveFavIcon(path.join(__dirname, "favIcon.svg")));
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
// routers
app.use(router);
// Serve static files from the 'upload' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", serveIndex("uploads", { icons: true }));

// error handlers
app.use(notFound);
app.use(errorHandler);

// run app
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
