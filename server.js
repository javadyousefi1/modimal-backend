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

var cors = require("cors");

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
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      // contact: {
      //   name: "LogRocket",
      //   url: "https://logrocket.com",
      //   email: "info@email.com",
      // },
    },
    servers: [
      {
        url: "https://modimal-shop.runflare.run",
      },
      {
        url: "http://localhost:3000",
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
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const isUserAlreadyExist = await registerModel.countDocuments({ email });

  if (isUserAlreadyExist !== 0) {
    res.status(400).json({
      statusCode: res.statusCode,
      message: "this email already exists",
      data: null,
    });
    return;
  }

  await registerModel
    .create({
      firstName,
      lastName,
      email,
      password,
    })
    .then(async (response) => {
      const verifyCode = Math.floor(100000 + Math.random() * 900000);

      await sendVerifyCode(firstName, lastName, email, verifyCode);
      await verifyCodeModel.create({ email, verifyCode });

      res.status(200).json({
        statusCode: res.statusCode,
        message: "user register succesfully",
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        statusCode: res.statusCode,
        message: err.message,
        data: null,
      });
    });
});

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
app.post("/login", async (req, res) => {
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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
