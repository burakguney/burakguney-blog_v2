const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: 0 },
    isSuperAdmin: {type: Boolean, default: 0},
    password: { type: String, required: true }
})

module.exports = mongoose.model("User", UserSchema)