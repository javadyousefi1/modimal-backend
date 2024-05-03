const { default: mongoose } = require("mongoose");
const DB_URL =
  "mongodb://root:82BlgCJM4KZVQb7sMTg4Z1p4@etna.liara.cloud:30050/modimal?authSource=admin&replicaSet=rs0&directConnection=true";
const DB_NAME = "admin";
const DB_CONNECT_URL = DB_URL + DB_NAME;

mongoose
  .connect(DB_URL)
  .then(() => console.log("connected to database :)"))
  .catch((err) => console.log(err.message));
