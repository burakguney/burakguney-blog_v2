/* const express = require('express');
const router = express.Router();
const Category = require("../../models/Category")

router.get('/editcategory', (req, res) => {

    if (req.session.userId) {
        Category.find({}).then((category) => {
            res.render("admin/editcategory", {
                category: category.reverse()
            })
        })
    } else {
        res.redirect("/users/login")
    }

})

router.post('/editcategory', (req, res) => {

    Category.create(req.body, (error, category) => {
        if (!error) {
            req.session.sessionMessage = {
                type: "alert alert-success text-center",
                message: "Kategori başarıyla eklendi!"
            }
            res.redirect("/admin/editcategory")
        }
    })
})

module.exports = router */