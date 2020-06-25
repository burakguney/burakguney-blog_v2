const express = require('express');
const router = express.Router();
const About = require('../../models/About');
const path = require("path");



router.get('/addabout', (req, res) => {

    if (req.session.isSuperAdmin !== 1) {

        res.redirect("/")

    } else {

        res.render("admin/addabout", { title: 'Admin Hakkımda Ekle' })

    }

})


router.post('/addabout', (req, res) => {

    let aboutImage = req.files.aboutImage;
    aboutImage.mv(path.resolve(__dirname, "../../public/img/aboutImages", aboutImage.name))

    About.create({
        ...req.body,
        aboutImage: `/img/aboutImages/${aboutImage.name}`
    },
        (error) => {
            if (!error) {
                req.session.sessionMessage = {
                    type: "alert alert-success text-center",
                    message: "Hakkımda başarıyla eklendi!"
                }
                res.redirect("/admin/addabout")
            }
        })

})


router.get('/about', (req, res) => {

    if (req.session.isSuperAdmin !== 1) {
        res.redirect("/")

    } else {
        About.find({}).then((about) => {
            res.render("admin/about", {
                about: about,
                title: "Admin Hakkımda"
            })
        })
    }

})


router.delete('/about/:id', (req, res) => {

    About.deleteOne({ _id: req.params.id }).then(() => {
        req.session.sessionMessage = {
            type: "alert alert-warning text-center",
            message: "Hakkımda silindi!"
        }
        res.redirect("/admin/about")
    })

})


router.get('/about/edit/:id', (req, res) => {

    if (req.session.isAdmin !== 1) {
        res.redirect("/")
    } else {
        About.findOne({ _id: req.params.id }).then((about) => {
            res.render("admin/editabout", {
                about: about,
                title: "Admin Hakkımda Düzenle"
            })
        })
    }

})


router.put('/about/:id', (req, res) => {

    let aboutImage = req.files.aboutImage;
    aboutImage.mv(path.resolve(__dirname, "../../public/img/aboutImages", aboutImage.name))

    About.findOne({ _id: req.params.id }).then((about) => {

        about.about = req.body.about
        about.aboutImage = `/img/aboutImages/${aboutImage.name}`

        about.save().then((about) => {
            res.redirect("/admin/about")
        })
    })

})






module.exports = router