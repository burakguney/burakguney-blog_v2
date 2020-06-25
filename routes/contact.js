const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/email', (req, res) => {

    const outputHTML = `
    
    <h3>Burak Güney Blog İletişim</h2>
    <ul>
        <li>Gönderici İsim : ${req.body.name}</li>
        <li>Gönderici Email : ${req.body.email}</li>
    </ul>
    <h3>Mesaj</h3>
    <p>${req.body.message}</p>
    
    `

    "use strict";
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "burakguney.info@gmail.com", // generated ethereal user
                pass: "xhvqcwntgflutcax", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Burak Güney Blog 👻" <burakguney.info@gmail.com>', // sender address
            to: "burakguney.info@gmail.com", // list of receivers
            subject: "Burak Güney Blog", // Subject line
            text: "Hello world?", // plain text body
            html: outputHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.session.sessionMessage = {
            type: "alert alert-success text-center",
            message: "Mesaj gönderildi."
        }

        res.redirect("/contact")
    }


    main().catch(console.error);

})

router.get('/forgotpassword', (req, res) => {

    res.render("blogsite/forgotpassword")

})

router.post('/forgotpassword', (req, res) => {

    User.findOne({ email: req.body.email }).then((user) => {

        if (user) {
            const userHTML = `
                <h3>Hesap Bilgileri</h2>
                <ul>
                    <li>Email : ${user.email}</li>
                    <li>Parola : ${user.password}</li>
                </ul>`

            "use strict";
            const nodemailer = require("nodemailer");

            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "burakguney.info@gmail.com", // generated ethereal user
                        pass: "xhvqcwntgflutcax", // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Burak Güney Blog 👻" <burakguney.info@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: "Burak Güney Blog", // Subject line
                    text: "Hello world?", // plain text body
                    html: userHTML, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                req.session.sessionMessage = {
                    type: "alert alert-success text-center",
                    message: "E-postanızı kontrol ediniz."
                }

                res.redirect("/contact/forgotpassword")
            }

            main().catch(console.error);

        }

        else {

            req.session.sessionMessage = {
                type: "alert alert-danger text-center",
                message: "Kayıtlı E-posta bulunamadı."
            }

            res.redirect("/contact/forgotpassword")

        }

    })






})

module.exports = router