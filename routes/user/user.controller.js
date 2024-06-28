const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { hash } = require('../../utils/crypto');
const sendMailer = require('../../utils/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path')

//@desc get di tutti gli utenti
//@route GET /api/user/
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.selectAllUsers({ alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc get di un utente dato l'id
//@route GET /api/user/:id
//@access private
const getUser = asyncHandler(async (req, res) => {
    const result = await User.selectUser({ idu: req.params.idu, alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc get di un utente data la mail
//@route GET /api/user/getUserByEmail
//@access private
const getUserByEmail = asyncHandler(async (req, res) => {
    const result = await User.selectUserByEmail({ email: req.query.email, alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc update di un utente
//@route PUT /api/user/
//@access private
const updateUser = asyncHandler(async (req, res) => {
    // const result = await User.updateUser({ ...req.body, idu: req.params.idu });
    const result = await User.updateUser({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Utente modificato" });
});

//@desc eliminazione di un utente
//@route DELETE /api/user/
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const result = await User.deleteUser({ idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Utente eliminato" });
});

//@desc conferma cambio password utente
//@route PUT /api/user/confirm-change-password/
//@access private
const confirmChangePassword = asyncHandler(async (req, res) => {
    const hashedPassword = hash(req.body.newPassword);
    req.body.newPassword = hashedPassword;

    const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/changePassword.html")).toString());
    const replacements = {
        password: hashedPassword
    };
    console.log("si");
    await sendMailer({
        from: process.env.MAIL,
        to: req.user.email,
        subject: "CAMBIO PASSWORD",
        text: "",
        html: template(replacements)
    });

    // const result = await User.changePassword({ idu: req.user.idu, password: hashedPassword });
    // if (result.affectedRows != 1) {
    //     res.status(500);
    //     throw new Error("Errore inaspettato");
    // }

    res.status(200).send({ message: "Email mandata" });
});

//@desc Cambio password utente
//@route PUT /api/user/change-password/:idu
//@access private
const changePassword = asyncHandler(async (req, res) => {
    const hashedPassword = hash(req.body.newPassword);
    req.body.password = hashedPassword;

    const result = await User.changePassword({ idu: req.user.idu, password: hashedPassword });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Password cambiata" });
});

//@desc get Nome Cognome immagine profilo
//@route GET /api/user/info/
//@access private
const getInfo = asyncHandler(async (req, res) => {
    const result = await User.selectInfoUser({ idu: req.user.idu });

    res.status(200).send(result);
});

//@desc API cambio immagine del profilo utente
//@route put /api/user/change-image/
//@access private
const changeImageProfile = asyncHandler(async (req, res) => {
    const result = await User.changeImage({ idu: req.user.idu, id_img: req.body.id_img });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }
    res.status(200).send({ message: "Immagine profilo cambiata" });
});

module.exports = { getAllUsers, getUser, getUserByEmail, updateUser, deleteUser, confirmChangePassword, changePassword, getInfo, changeImageProfile };