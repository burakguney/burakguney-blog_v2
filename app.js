/* MODULE EXPORTS */
const express = require("express")
const exphbs = require("express-handlebars")
const _handlebars = require('handlebars')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
/* MODULE EXPORTS END */

/* MONGOOSE MONGODB BAĞLANTISI */
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/nodeBlog',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Mongodb Connected");
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
/* PORT LISTEN END */