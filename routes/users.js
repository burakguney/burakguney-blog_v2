const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/register', (req, res) => {

    res.render("blogsite/register", { title: 'Hesap Oluştur' })

})


router.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                req.session.sessionMessage = {
                    type: "alert alert-danger text-center",
                    message: "Bu kullanıcı adı alınmış!"
                }

                res.redirect('/users/register');

            }
            else {
                User.findOne({ email: email }).then(user => {
                    if (user) {
                        req.session.sessionMessage = {
                            type: "alert alert-danger text-center",
                            message: "Bu email hesabı alınmış!"
                        }

                        res.redirect('/users/register');

                    } else {
                        User.create(req.body, (error, user) => {
                            req.session.sessionMessage = {
                                type: "alert alert-success text-center",
                                message: "Kayıt işlemi başarıyla tamamlandı!"
                            }

                            res.redirect("/users/login")

                        })
                    }
                })
            }
        })
})


router.get('/login', (req, res) => {

    res.render("blogsite/login", { title: 'Admin Girişi' })

})


router.post('/login', (req, res) => {

    const { email, password } = req.body

    User.findOne({ email }, (error, user) => {

        if (user) {

            if (user.password === password) {

                if (user.isAdmin == 1) {
                    req.session.userId = user._id
                    req.session.username = user.username
                    req.session.email = user.email
                    req.session.isAdmin = 1
                    if (user.isSuperAdmin) {
                        req.session.isSuperAdmin = 1
                    }
                    res.redirect("/admin")
                }
                else {
                    req.session.userId = user._id
                    req.session.username = user.username
                    req.session.email = user.email
                    req.session.isAdmin = 0
                    res.redirect("/")
                }
            }
            else {
                req.session.sessionMessage = {
                    type: "alert alert-danger text-center",
                    message: "Geçersiz parola lütfen kontrol et!"
                }
                res.redirect("/users/login")
            }
        }
        else {
            req.session.sessionMessage = {
                type: "alert alert-danger text-center",
                message: "Geçersiz e-posta lütfen kontrol et!"
            }
            res.redirect("/users/login")
        }
    })

})


router.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect("/users/login")
    })


})


router.get('/edit/:id', (req, res) => {

    if (req.session.userId != req.params.id) {

        res.redirect("/")

    } else {

        User.findOne({ _id: req.params.id }).then((user) => {

            res.render("blogsite/edituser", {
                user: user,
                title: 'Kullanıcı Düzenle'
            })

        })
    }
})


router.put('/edit/:id', (req, res) => {


    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {

            if (user.email == req.session.email) {

                User.findOne({ _id: req.params.id }).then((user) => {
                    user.email = req.body.email
                    user.password = req.body.password
                    req.session.email = req.body.email
                    user.save().then((user) => {
                        res.render("blogsite/edituser", { user: user, title: "Kullanıcı Düzenle", type: "alert alert-success text-center", message: "Değişiklik Kaydedildi.", type2: "fa fa-times" })
                    })
                })

            }
            else {
                req.session.sessionMessage = {
                    type: "alert alert-warning text-center",
                    message: "Böyle bir e-posta var"
                }

            }
        }
        else {
            User.findOne({ _id: req.params.id }).then((user) => {
                user.email = req.body.email
                user.password = req.body.password
                req.session.email = req.body.email
                user.save().then((user) => {
                    res.render("blogsite/edituser", { user: user, title: "Kullanıcı Düzenle", type: "alert alert-success text-center", message: "E-posta değiştirildi.", type2: "fa fa-times" })
                })
            })
        }
    })

})



module.exports = router