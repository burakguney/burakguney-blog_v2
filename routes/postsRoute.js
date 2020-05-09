const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/new', (req, res) => {
    res.render("blogsite/addpost")
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        res.render("blogsite/post", { post: post })
    })
})

router.post('/test', (req, res) => {
    Post.create(req.body)
    res.redirect("/blog")
})

module.exports = router