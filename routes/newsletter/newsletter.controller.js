const asyncHandler = require('express-async-handler');
const Newsletter = require('../../models/newsletter.model');
const sendMailer = require('../../utils/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path')

//@desc API inserimento newsletter
//@route POST /api/newsletter/
//@access private
const addNewsletter = asyncHandler(async (req, res) => {
    const result = await Newsletter.insertNewsletter({ email: req.body.email, cookie_accepted: req.body.accepted_cookie });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/newsletter_sub.html")).toString());
    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "ISCRIZIONE NEWSLETTER",
        text: "",
        html: template()
    });

    res.status(201).send({ message: "Utente salvato nella newsletter!" });
});

module.exports = { addNewsletter };
