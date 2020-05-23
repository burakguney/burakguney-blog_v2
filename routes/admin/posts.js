const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Category = require("../../models/Category")
const path = require("path");



router.get('/addpost', (req, res) => {

    if (req.session.isAdmin !== 1) {
        res.redirect("/")
    } else {
        Category.find({}).then((categories) => {
            res.render("admin/addpost", {
                categories: categories.reverse(),
                title: "Admin İçerik Ekle"
            })
        })
    }

})


router.post('/addpost', (req, res) => {

    let postImage = req.files.postImage;
    postImage.mv(path.resolve(__dirname, "../../public/img/postImages", postImage.name))

    Post.create({
        ...req.body,
        postImage: `/img/postImages/${postImage.name}`,
        author: req.session.userId
    },
        (error) => {
            if (!error) {
                req.session.sessionMessage = {
                    type: "alert alert-success text-center",
                    message: "İçerik başarıyla eklendi!"
                }
                res.redirect("/admin/addpost")
            }
        })
})


router.get('/editposts', (req, res) => {

    if (req.session.isAdmin !== 1) {
        res.redirect("/")
    } else {
        Post.find({}).populate({ path: "category", model: Category }).sort({ $natural: -1 }).populate({ path: "author", model: User }).then((posts) => {
            Category.find({}).then((categories) => {
                res.render("admin/editposts", {
                    posts: posts,
                    categories: categories,
                    title: "Admin İçerikleri Düzenle"
                })
            })
        })
    }

})


router.delete('/editposts/:id', (req, res) => {

    Post.deleteOne({ _id: req.params.id }).then(() => {
        req.session.sessionMessage = {
            type: "alert alert-warning text-center",
            message: "İçerik silindi!"
        }
        res.redirect("/admin/editposts")
    })

})


router.get('/editposts/edit/:id', (req, res) => {

    if (req.session.isAdmin !== 1) {
        res.redirect("/")
    } else {
        Post.findOne({ _id: req.params.id }).then((post) => {
            Category.find({}).then((categories) => {
                res.render("admin/editpost", {
                    post: post,
                    categories: categories,
                    title: "Admin İçerik Düzenle"
                })
            })
        })
    }

})


router.put('/editposts/:id', (req, res) => {

    let postImage = req.files.postImage;
    postImage.mv(path.resolve(__dirname, "../../public/img/postImages", postImage.name))

    Post.findOne({ _id: req.params.id }).then((post) => {
        post.title = req.body.title
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.postImage = `/img/postImages/${postImage.name}`

        post.save().then((post) => {
            res.redirect("/admin/editposts")
        })
    })

})



module.exports = router