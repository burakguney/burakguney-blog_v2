/* MODULE EXPORTS */
const express = require("express")
const exphbs = require("express-handlebars")
const _handlebars = require('handlebars')
const app = express()
const port = 3000
const hostname = "127.0.0.1"
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
/* MODULE EXPORTS END */


/* MONGOOSE MONGODB BAĞLANTISI */
mongoose.connect('mongodb://127.0.0.1/blogjs_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
/*  MONGOOSE MONGODB END */


/* MIDDLEWARES */
app.use(express.static("public"))//STATIC DOSYALARIN PUBLIC UZANTISI BELIRTILDI


/* TEMPLATE ENGINE */
app.engine("handlebars", exphbs({
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set("view engine", "handlebars");
/* TEMPLATE ENGINE END */


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* ROUTES MIDDLEWARE */
const main = require('./routes/mainRoute')
const posts = require('./routes/postsRoute')
app.use("/", main)
app.use("/posts", posts)
/* ROUTES MIDDLEWARE */


/* MIDDLEWARES END */


/* PORT LISTEN */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
/* PORT LISTEN END */