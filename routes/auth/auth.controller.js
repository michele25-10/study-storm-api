const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const ResetPassword = require('../../models/reset-password.model');
const { hash } = require('../../utils/crypto');
const sendMailer = require('../../utils/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path')

//@desc accedere con un utente
//@route POST /api/auth/login
//@access public
const login = asyncHandler(async (req, res) => {
    const { email, password, mobile } = req.body;

    const hashedPassword = hash(password);

    let objUser = await User.login({ email });

    if (objUser.length != 1) {
        res.status(404);
        throw new Error();
    }

    objUser = objUser[0];

    if (objUser.password === hashedPassword) {
        const accessToken = jwt.sign({
            user: {
                idu: objUser.id,
                ist: objUser.id_student_type,
                courseStudy: objUser.course_study,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: mobile ? "4320h" : "1h" });

        res.status(200).send({
            accessToken, info: {
                name: objUser.name,
                surname: objUser.surname,
                email: objUser.email,
                tel: objUser.tel,
                course_study: objUser.course_study,
                prof_img: objUser.prof_img
            }
        });
    } else {
        res.status(404);
        throw new Error();
    }
});

//@desc registrare un utente
//@route POST /api/auth/registration
//@access public
const registration = asyncHandler(async (req, res) => {
    const hashedPassword = hash(req.body.password);
    req.body.password = hashedPassword;

    let result = await User.selectUserByEmail({ email: req.body.email });

    if (result.length > 0) { // utente già registrato
        res.status(400);
        throw new Error();
    }

    result = await User.insertVerification({ user_credentials: JSON.stringify(req.body) });

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    result = await User.retrieveVerification({ id: result.insertId });

    if (result.length != 1) {
        res.status(404);
        throw new Error();
    }

    const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/verify.html")).toString());
    const replacements = {
        verification_key: result[0].verification_key
      };
    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "VERFICA ACCOUNT STUDENTIME",
        text: "",
        html: template(replacements)
    });

    res.status(201).send({ message: "Controlla la tua email" });
});

//@desc verifica un utente
//@route GET /api/auth/verify
//@access public
const verify = asyncHandler(async (req, res) => {
    console.log(req.query);

    res.status(201).send({ message: "Controlla la tua email" });
})

//@desc in caso di password dimenticata
//@route POST /api/auth/forgot-password
//@access public
const forgotPassword = asyncHandler(async (req, res) => {
    //Controllo se la mail esiste nel db del progetto
    const mailExists = await User.selectUserByEmail({ email: req.body.email, alsoDisactive: false });
    if (mailExists.length != 1) {
        res.status(404);
        throw new Error("Email inesistente");
    }

    const idu = mailExists[0].id;

    // Controllo se è già stata inviata una mail di password dimenticata nelle ultime 24 ore ancora attiva
    const existResetPassword = await ResetPassword.checkResetPassword({ idu, verified: 0 });
    if (existResetPassword.length > 0) {
        res.status(404);
        throw new Error('La mail è già stata inviata');
    }

    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "PASSWORD DIMENTICATA STUDENTIME",
        text: "",
        html: `
        <!DOCTYPE html>
            <html lang="it">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Dimenticata</title>
            </head>
            <body>

                <h1 class="title" style="color: orange; font-size: 32px; font-weight: bold;">Password Dimenticata!</h1>
                
                <div class="paragraph" style="margin-top: 20px; margin-bottom: 20px; color: black; ">
                    <p>Gentile utente, qualora avessi dimenticato la password premi il bottone conferma!<br></p>

                    <p>Qualora invece non fossi stato tu a richiedere il cambio password, assicurati che la tua password sia sicura:<br>
                    <i>${req.headers['user-agent']}</i></p>
                
                    <p>Se non sei tu che stai cercando di recuperare la tua password inviaci una mail all'indirizzo:<br>
                    studentime@gmail.com</p>

                    <!-- Bottone Invia -->
                    <button style="background-color: green;border-radius: 5px; color: white; font-weight: bold;width: maxcontent; border-color:green; ">Confermo!</button>
                </div>
            </body>
        </html>`
    });

    const result = await ResetPassword.insertResetPassword({ idu });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Controlla le tue mail!" });
});

module.exports = { login, registration, forgotPassword, verify };