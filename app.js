const express = require("express")
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
const app = express()

const mongoose = require("mongoose")
const connectMongo = require('connect-mongo')

const port = process.env.PORT || 3000

const handlebars = require('handlebars')
const expressHandlebars = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const bodyParser = require('body-parser')

const helperGenerateDate = require('./helpers/generateDate').generateDate
const truncate = require('./helpers/truncate').truncate
const paginate = require("./helpers/pagination").paginate

const methodOverride = require("method-override")



mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/nodeBlog',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("Mongodb Connected")
})



const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret: "kadripasa",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))



app.use((req, res, next) => {
    const { userId, isAdmin, username } = req.session
    if (userId) {
        res.locals = {
            displayLink: true
        }
        if (isAdmin == 1) {
            res.locals = {
                displayLink: true,
                displayAdmin: true,
                userTitle: username
            }
        } else {
            res.locals = {
                displayLink: true,
                displayAdmin: false,
                userTitle: username,
                userId: userId
            }
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})



app.use((req, res, next) => {
    res.locals.sessionMessage = req.session.sessionMessage
    delete req.session.sessionMessage
    next()
})



app.use(fileUpload())
app.use(express.static("public"))
app.use(methodOverride("_method"))



app.engine("handlebars", expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
        generateDate: helperGenerateDate,
        truncate: truncate,
        paginate: paginate
    }
}));
app.set("view engine", "handlebars");



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const main = require('./routes/main')
app.use("/", main)

const users = require('./routes/users');
app.use("/users", users)


const admin = require('./routes/admin/home');
app.use("/admin", admin)
const adminCategory = require('./routes/admin/category');
app.use("/admin", adminCategory)
const adminPosts = require('./routes/admin/posts');
app.use("/admin", adminPosts)
const adminAbout = require('./routes/admin/about');
app.use("/admin", adminAbout)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})