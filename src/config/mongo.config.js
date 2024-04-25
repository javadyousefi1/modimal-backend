const { default: mongoose } = require("mongoose");
const DB_URL =
  "mongodb://admin:xHFrwVqZyiwkn4THS93f@remote-asiatech.runflare.com:32515/";
const DB_NAME = "admin";
const DB_CONNECT_URL = DB_URL + DB_NAME;

mongoose
  .connect(DB_CONNECT_URL)
  .then(() => console.log("connected to database :)"))
  .catch((err) => console.log(err.message));
