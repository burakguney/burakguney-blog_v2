const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const path = require("path");

router.get('/editpost', (req, res) => {
    if (req.session.userId) {
        res.render("admin/editpost")
    } else {
        res.redirect("/users/login")
    }
})

router.post('/editpost', (req, res) => {

    let postImage = req.files.postImage;
    postImage.mv(path.resolve(__dirname, "../../public/img/postImages", postImage.name))

    Post.create({
        ...req.body,
        postImage: `/img/postImages/${postImage.name}`
    },
        (error) => {
            if (!error) {
                req.session.sessionMessage = {
                    type: "alert alert-success text-center",
                    message: "İçerik başarıyla eklendi!"
                }
                res.redirect("/blog")
            }
        })
})

module.exports = router