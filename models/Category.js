const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    categoryname: { type: String, required: true, unique: true }
})

module.exports = mongoose.model("Category", CategorySchema)