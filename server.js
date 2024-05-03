// express
const express = require("express");
const app = express();
// routes
const router = require("./src/routes");
// env
require("dotenv").config();
// db
require("./src/config/mongo.config")
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
        // url: "https://modimal-shop.runflare.run",
      },
      {
        // url: "http://localhost:3000",
        url: "https://modimal-shop.runflare.run",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Enable CORS for all routes
app.use(cors());

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use(router);

// error handlers
app.use(notFound);
app.use(errorHandler);

// run app
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
