const express = require('express');
const router = express.Router();
const Category = require("../../models/Category");



router.get('/editcategory', (req, res) => {

    if (req.session.isAdmin !== 1) {
        res.redirect("/")

    } else {
        Category.find({}).then((category) => {
            res.render("admin/editcategory", {
                category: category.reverse(),
                title: "Admin Kategoriler"
            })
        })
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


router.delete('/editcategory/:id', (req, res) => {

    Category.deleteOne({ _id: req.params.id }).then(() => {
        req.session.sessionMessage = {
            type: "alert alert-warning text-center",
            message: "Kategori silindi!"
        }
        res.redirect("/admin/editcategory")
    })

})



module.exports = router