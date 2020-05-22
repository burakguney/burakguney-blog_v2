const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require("../models/Category");
const About = require('../models/About');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render("blogsite/home", { title: 'Anasayfa' })

})


router.get('/about', (req, res) => {

    About.find({}).then((about) => {
        res.render("blogsite/about", {
            about: about,
            title: 'Hakkımda'
        })
    })

})


router.get('/blog', (req, res) => {

    const postPerPage = 4
    const page = req.query.page || 1

    Post.find({}).populate({ path: "author", model: User })
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
        .then((posts) => {
            Post.countDocuments().then(postCount => {
                Category.aggregate([
                    {
                        $lookup: {
                            from: "posts",
                            localField: "_id",
                            foreignField: "category",
                            as: "posts"
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            categoryname: 1,
                            num_of_posts: { $size: "$posts" }
                        }
                    }
                ]).then((categories) => {
                    res.render("blogsite/blog", {
                        postsall: posts.reverse(),
                        post3: posts.reverse().slice(0, 3),
                        categories: categories.reverse(),
                        title: 'Blog',
                        current: parseInt(page),
                        pages: Math.ceil(postCount / postPerPage)
                    })
                })
            })
        })

})


router.get('/blog/:id', (req, res) => {

    Post.findById(req.params.id).populate({ path: "author", model: User }).then((post) => {
        Post.find({}).then((posts) => {
            Category.aggregate([
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "category",
                        as: "posts"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        categoryname: 1,
                        num_of_posts: { $size: "$posts" }
                    }
                }
            ]).then((categories) => {
                res.render("blogsite/post", {
                    post: post,
                    post3: posts.reverse().slice(0, 3),
                    categories: categories.reverse(),
                    title: 'Blog'
                })
            })
        })
    })

})

router.get("/blog/category/:categoryId", (req, res) => {

    Post.find({ category: req.params.categoryId }).populate({ path: "category", model: Category }).populate({ path: "author", model: User }).then((posts) => {
        Category.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "category",
                    as: "posts"
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryname: 1,
                    num_of_posts: { $size: "$posts" }
                }
            }
        ]).then((categories) => {
            res.render("blogsite/blog", {
                posts: posts,
                post3: posts.reverse().slice(0, 3),
                categories: categories.reverse(),
                title: 'Blog'
            })
        })
    })
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search", (req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Post.find({ "title": regex }).then((posts) => {
            Category.aggregate([
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "category",
                        as: "posts"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        categoryname: 1,
                        num_of_posts: { $size: "$posts" }
                    }
                }
            ]).then((categories) => {
                res.render("blogsite/blog", {
                    posts: posts,
                    post3: posts.reverse().slice(0, 3),
                    categories: categories.reverse(),
                    title: 'Blog'
                })
            })
        })
    }
})


router.get('/contact', (req, res) => {

    res.render("blogsite/contact", { title: "İletişim" })

})


module.exports = router