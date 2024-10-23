const { Schema, model } = require("mongoose");

// Define the main reservation schema
const reservationSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  date: { type: Date, required: true, trim: true },
  text: { type: String, required: false, trim: true },
  deskNumber: { type: Number, required: true, trim: true },
}, { timestamps: true, versionKey: false });

const reservationModel = model("reservation", reservationSchema);

module.exports = { reservationModel };
