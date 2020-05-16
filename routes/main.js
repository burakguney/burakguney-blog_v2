const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require("../models/Category");

router.get('/', (req, res) => {
    /* console.log(req.session); */
    res.render("blogsite/home")
})

router.get('/about', (req, res) => {
    res.render("blogsite/about")
})

router.get('/blog', (req, res) => {
    Post.find({}).then((posts) => {
        Category.find({}).then((categories) => {
            res.render("blogsite/blog", {
                posts: posts,
                post3: posts.reverse().slice(0, 3),
                categories: categories.reverse()
            })
        })
    })
})

router.get('/blog/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        Post.find({}).then((posts) => {
            Category.find({}).then((categories) => {
                res.render("blogsite/post", {
                    post: post,
                    post3: posts.reverse().slice(0, 3),
                    categories: categories.reverse()
                })
            })
        })
    })
})

router.get('/contact', (req, res) => {
    res.render("blogsite/contact")
})


module.exports = router