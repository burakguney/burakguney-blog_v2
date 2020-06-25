const express = require('express');
const router = express.Router();
const User = require("../../models/User")
const Post = require("../../models/Post")
const Category = require("../../models/Category")


router.get('/', (req, res) => {

    if (req.session.isAdmin != 1) {
        res.redirect("/")

    } else {
        console.log(req.session);
        res.render("admin/home", { title: 'Admin Anasayfa' })
    }
})

router.get('/users', (req, res) => {

    if (req.session.isAdmin != 1) {

        res.redirect("/")

    } else {

        User.find({}).then((users) => {
            res.render("admin/users", {
                users: users,
                title: 'Admin Kullanıcılar'
            })
        })
    }
})

router.delete('/users/:id', (req, res) => {

    User.findOne({ _id: req.params.id }).then((user) => {

        if (user.isSuperAdmin) {

            req.session.sessionMessage = {
                type: "alert alert-danger text-center",
                message: "Bu kullanıcı silinemez!"
            }
            res.redirect("/admin/users")

        } else if (req.session.isSuperAdmin || req.session.userId == req.params.id) {

            User.deleteOne({ _id: req.params.id }).then(() => {
                req.session.sessionMessage = {
                    type: "alert alert-warning text-center",
                    message: "Kullanıcı silindi!"
                }
                res.redirect("/admin/users")
            })
        } else {
            req.session.sessionMessage = {
                type: "alert alert-danger text-center",
                message: "Bunu yapmaya yetkiniz yok!"
            }
            res.redirect("/admin/users")
        }
    })
})

router.get('/users/edit/:id', (req, res) => {

    if (req.session.isAdmin != 1) {

        res.redirect("/")

    } else {

        User.findOne({ _id: req.params.id }).then((user) => {

            if (req.session.isAdmin) {

                if (user.isSuperAdmin && !req.session.isSuperAdmin) {
                    req.session.sessionMessage = {
                        type: "alert alert-danger text-center",
                        message: "Bunu yapmaya yetkiniz yok!"
                    }
                    res.redirect("/admin/users")
                } else if (req.session.isSuperAdmin || req.session.userId == req.params.id) {
                    res.render("admin/edituser", {
                        user: user,
                        title: 'Admin Kullanıcı Düzenle'
                    })
                } else {
                    req.session.sessionMessage = {
                        type: "alert alert-danger text-center",
                        message: "Bunu yapmaya yetkiniz yok!"
                    }
                    res.redirect("/admin/users")
                }

            } else {

                req.session.sessionMessage = {
                    type: "alert alert-danger text-center",
                    message: "Bunu yapmaya yetkiniz yok!"
                }
                res.redirect("/admin/users")

            }
        })
    }
})


router.put('/users/:id', (req, res) => {

    User.findOne({ _id: req.params.id }).then((user) => {

        user.email = req.body.email
        user.isAdmin = req.body.isAdmin
        user.password = req.body.password

        user.save().then((user) => {
            res.redirect("/admin/users")
        })
    })
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search", (req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Post.find({ "title": regex }).populate({ path: "category", model: Category }).populate({ path: "author", model: User }).then((posts) => {

            res.render("admin/editposts", {
                posts: posts,
                title: 'Blog'
            })
        })

    }
})


module.exports = router