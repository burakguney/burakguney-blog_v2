const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.render("blogsite/home")
})

router.get('/about', (req, res) => {
    res.render("blogsite/about")
})

router.get('/blog', (req, res) => {
    Post.find({}).then((posts) => {
        res.render("blogsite/blog", { posts: posts })
    })
})

router.get('/contact', (req, res) => {
    res.render("blogsite/contact")
})

router.get('/login', (req, res) => {
    res.render("blogsite/login")
})

router.get('/register', (req, res) => {
    res.render("blogsite/register")
})

module.exports = router