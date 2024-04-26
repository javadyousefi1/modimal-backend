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

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  registerModel.create();
  res
    .status(200)
    .json({ statusCode: res.statusCode, message: "welcome to modimal" });
});

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
    res.status(200).json({
      statusCode: res.statusCode,
      message: "user logged in successfully",
      data: foundedUser[0],
    });
  }
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
