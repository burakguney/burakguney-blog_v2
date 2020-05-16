const express = require("express")
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');
const app = express()

const mongoose = require("mongoose")
const connectMongo = require('connect-mongo');

const port = process.env.PORT || 3000

const handlebars = require('handlebars')
const expressHandlebars = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const bodyParser = require('body-parser')

const helperGenerateDate = require('./helpers/generateDate').generateDate;


/* MONGOOSE MONGODB BAĞLANTISI */
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/nodeBlog',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("Mongodb Connected");
})
/* END */

const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret: "kadripasa",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req, res, next) => {
    const { userId, username } = req.session
    if (userId, username) {
        res.locals = {
            displayLink: true
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})


//sessionMessage middleware
app.use((req, res, next) => {
    res.locals.sessionMessage = req.session.sessionMessage
    delete req.session.sessionMessage
    next()
})

app.use(fileUpload());
app.use(express.static("public"));


/* TEMPLATE ENGINE */
app.engine("handlebars", expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
        generateDate: helperGenerateDate
    }
}));
app.set("view engine", "handlebars");
/* END */


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Link Middleware


/* ROUTES MIDDLEWARE */
const main = require('./routes/main')
app.use("/", main)

const users = require('./routes/users');
app.use("/users", users)

const admin = require('./routes/admin/home');
app.use("/admin", admin)
const adminCategory = require('./routes/admin/category');
app.use("/admin", adminCategory)
const adminPost = require('./routes/admin/post');
app.use("/admin", adminPost)
/* END */


/* PORT LISTEN */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
/*  END */