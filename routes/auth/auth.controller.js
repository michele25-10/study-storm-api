const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { hash } = require('../../utils/crypto');
const sendMailer = require('../../utils/mail');

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

    let result = await User.selectUserByEmail({email: req.body.email});

    if (result.length > 0){ // utente già registrato
        res.status(400);
        throw new Error();
    }

    result = await  User.insertVerification({user_credentials: JSON.stringify(req.body)});

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    result = await User.retrieveVerification({id: result.insertId});

    if (result.length != 1) {
        res.status(404);
        throw new Error();
    }

    console.log(result);

    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "VERFICA ACCOUNT STUDENTIME",
        text: "",
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email con Bottone Invia</title>
            </head>
            <body>
                <h1>Verifica account!</h1>
                <p>Verifica il tuo account premendo il bottone</p>
                
                <!-- Bottone Invia -->
                <form action="http://localhost:5010/" method="post">
                    <button type="submit">Confermo!</button>
                </form>
            </body>
            </html>
        `
    });

    res.status(201).send({ message: "Controlla la tua email" });
});

//@desc in caso di password dimenticata
//@route POST /api/auth/forgot-password
//@access public
const forgotPassword = asyncHandler(async (req, res) => {
    const mailExists = await User.selectUserByEmail({ email: req.body.email, alsoDisactive: false });
    if (mailExists.length === 0) {
        res.status(404);
        throw new Error("Email inesistente");
    }

    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "PASSWORD DIMENTICATA STUDENTIME",
        text: "",
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email con Bottone Invia</title>
            </head>
            <body>
                <h1>Password Dimenticata!</h1>
                <p>Gentile utente, qualora avessi dimenticato la password premi il bottone conferma!</br>
                Qualora invece non fossi stato tu a richiedere il cambio password, assicurati che la tua password sia sicura:</br>
                ${req.headers['user-agent']}</p>
                
                <!-- Bottone Invia -->
                <form action="http://localhost:5010/reset-password/confirm" method="post">
                    <button type="submit">Confermo!</button>
                </form>
            </body>
            </html>
        `
    });

    res.status(200).send({ message: "Controlla le tue mail!" });
});

module.exports = { login, registration, forgotPassword };