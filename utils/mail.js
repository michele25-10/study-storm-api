const nodemailer = require('nodemailer');

//@desc Inserisci info mail: from, to, subject, text, html
const sendMailer = async ({ from, to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL,             //Mail applicazione
            pass: process.env.MAIL_PASSWORD,    //password creata in gestione account -sicurezza -applicazione -genera, ed ecco la password
        },
    });

    try {
        await transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject,  // Subject line
            text, // plain text body
            html,  // html body
        });
        return;
    } catch (error) {
        throw new Error("Error: Errore nell'invio della mail");
    }
}

module.exports = sendMailer;