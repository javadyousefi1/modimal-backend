const { Schema, model } = require("mongoose");

const waiterSchema = new Schema({
    deskNumber: { type: Number, required: true},
}, { timestamps: true, versionKey: false })

const waiterModel = model("waiter", waiterSchema)

module.exports = { waiterModel }                                                                                                                