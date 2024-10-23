const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName: { type: String, required: true, trim: true },
    // email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    // isVerify: { type: Boolean, default: false },
    role: { type: String, default: "admin" },
}, { timestamps: true, versionKey: false })

const userModel = model("user", userSchema)

module.exports = { userModel }