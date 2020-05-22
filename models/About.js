const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema({
    about: { type: String, required: true },
    aboutImage: { type: String, required: true }
})

module.exports = mongoose.model("About", AboutSchema)