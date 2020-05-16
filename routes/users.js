const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', (req, res) => {
    res.render("blogsite/register")
})

router.post('/register', (req, res) => {

    User.create(req.body, (error, user) => {
        req.session.sessionMessage = {
            type: "alert alert-success text-center",
            message: "Kayıt işlemi başarıyla tamamlandı!"
        }
        res.redirect("/users/login")
    })
})

router.get('/login', (req, res) => {
    res.render("blogsite/login")
})

router.post('/login', (req, res) => {

    const { email, password } = req.body

    User.findOne({ email }, (error, user) => {
        if (user) {
            if (user.password === password) {
                req.session.userId = user._id
                req.session.username = user.username
                res.redirect("/")
            } else {
                req.session.sessionMessage = {
                    type: "alert alert-danger text-center",
                    message: "Geçersiz parola lütfen kontrol et!"
                }
                res.redirect("/users/login")
            }
        } else {
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

module.exports = router