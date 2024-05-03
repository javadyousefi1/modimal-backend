// express
const express = require("express");
const app = express();
// port
const PORT = 3000;
// db connection
const db = require("./src/config/mongo.config");
// middleware
const { notFound, errorHandler } = require("./src/middlewares/errorHandlers");
// model
const { registerModel } = require("./src/models/register.model");
const { verifyCodeModel } = require("./src/models/verifyCode.model");
const sendVerifyCode = require("./src/utils/sendVerifyCode");
require("dotenv").config();
var cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { validate } = require("./src/middlewares/validatorHandler");
const { registerSchema } = require("./src/validators/register.validator");
const { loginSchema } = require("./src/validators/login.validator");
let multer = require("multer");
const path = require("path");
const fs = require("fs");
const { productSchema } = require("./src/validators/product.validator");
const router = require("./src/routes");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync("/uploads", { recursive: true });
    const uploadDir = path.join(__dirname, "uploads");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileFormat = file.originalname.split(".")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileFormat);
  },
});

const upload = multer({ storage });
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
  apis: ["./*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Home
 *     summary: Welcome message
 *     description: Returns a welcome message to the user.
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A welcome message.
 */
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ statusCode: res.statusCode, message: "welcome to modimal" });
});

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of users
 *     description: Returns a list of users, excluding their passwords.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A success message indicating the users list was retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: User object
 */
app.get("/users", async (req, res) => {
  const usersList = await registerModel
    .find({})
    .sort({ _id: -1 })
    .select("-password");
  res.status(200).json({
    statusCode: res.statusCode,
    message: "users list gets succsesfully",
    data: usersList,
  });
});

/**
 * @swagger
 * /verifyEmail:
 *   post:
 *     summary: Verifies a user's email using a verification code
 *     description: This endpoint is used to verify a user's email by checking if the provided verification code matches the one stored in the database.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verifyCode
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user to be verified.
 *               verifyCode:
 *                 type: number
 *                 description: The verification code sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verification was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A success message indicating the email was verified successfully.
 *       400:
 *         description: The verification code provided is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: An error message indicating the verification code is not correct.
 */
app.post("/verifyEmail", async (req, res) => {
  const { email, verifyCode } = req.body;

  const codeIsValid =
    (await verifyCodeModel.countDocuments({
      email,
      verifyCode,
    })) === 1;

  if (codeIsValid) {
    const updateUser = await registerModel.updateOne(
      { email },
      { isVerify: true }
    );
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user verify succsecfully",
    });
  } else {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "verify code is not correct",
    });
  }
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a new user by providing first name, last name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A success message indicating the user was registered successfully.
 *                 data:
 *                   type: object
 *                   description: User object
 *       400:
 *         description: Email already exists or registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A message indicating the email already exists or registration failed.
 *                 data:
 *                   type: null
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log in a user
 *     description: Log in a user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A success message indicating the user was logged in successfully.
 *                 data:
 *                   type: object
 *                   description: User object without password
 *       400:
 *         description: Email or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A message indicating the email or password is incorrect.
 *                 data:
 *                   type: null
 */
app.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const foundedUser = await registerModel.find({ email, password });
  if (foundedUser.length === 0) {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "email or password is un correct",
      data: null,
    });
  } else {
    const userData = foundedUser[0];
    delete userData.password;
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user logged in successfully",
      data: userData,
    });
  }
});

/**
 * @swagger
 * /verifyEmail:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Retrieve all verify codes
 *     description: Retrieve all verify codes for email verification purposes.
 *     responses:
 *       200:
 *         description: Verify codes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response.
 *                 message:
 *                   type: string
 *                   description: A success message indicating verify codes were retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Verify code object
 */
app.get("/verifyEmail", async (req, res) => {
  const verifyCodes = await verifyCodeModel.find({});
  res.status(200).json({
    statusCode: res.statusCode,
    message: "verfiy codes gets succsesfully",
    data: verifyCodes,
  });
});

app.post("/upload", upload.single("banner"), (req, res) => {
  // Check if product name is provided
  if (!req.body.productName) {
    return res.status(400).json({ error: "Product name is required." });
  }

  // Validation passed, respond with success
  res.status(200).json({ message: "File uploaded successfully." });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
