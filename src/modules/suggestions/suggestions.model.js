const { Schema, model } = require("mongoose");

const suggestionsSchema = new Schema({
    subject: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
}, { timestamps: true, versionKey: false })

const suggestionsModel = model("suggestions", suggestionsSchema)

module.exports = { suggestionsModel }