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
                email: objUser.email,
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
        res.status(500);
        throw new Error();
    }

    result = await User.insertVerification({ user_credentials: JSON.stringify(req.body) });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    result = await User.retrieveVerification({ id: result.insertId, key: false });

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
    let result = await User.retrieveVerification({ id: false, key: req.query.verification_key });

    if (result[0].verified == 1) {
        res.status(500);
        throw new Error();
    }

    const key = result[0].verification_key;

    if (result.length != 1) {
        res.status(404);
        throw new Error();
    }

    const user_credentials = JSON.parse(result[0].user_credentials);

    result = await User.setVerified({ verification_key: key });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    result = await User.registration({
        name: user_credentials.name,
        surname: user_credentials.surname,
        email: user_credentials.email,
        tel: user_credentials.tel,
        password: user_credentials.password,
        id_student_type: user_credentials.id_student_type,
        course_study: user_credentials.course_study,
        birth_date: user_credentials.birth_date,
        prof_img: user_credentials.prof_img || ""
    });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Registrazione completata" });
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

    const result = await ResetPassword.insertResetPassword({ idu });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    const idResetPassword = result.insertId;

    const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/forgotPassword.html")).toString());
    const replacements = {
        idResetPassword,
        host: req.headers['user-agent']
    };


    await sendMailer({
        from: process.env.MAIL,
        to: req.body.email,
        subject: "PASSWORD DIMENTICATA STUDENTIME",
        text: "",
        html: template(replacements)
    });

    res.status(200).send({ message: "Controlla le tue mail!" });
});

module.exports = { login, registration, forgotPassword, verify };