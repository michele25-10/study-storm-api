const asyncHandler = require('express-async-handler');
const ResetPassword = require('../../models/reset-password.model');
const User = require('../../models/user.model');
const sendMailer = require('../../utils/mail');
const { hash } = require("../../utils/crypto");
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path')

const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*:;<>,.?';
    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersCharset = '0123456789';
    const specialCharset = '!@#$%^&*:;<>,.?';

    let password = '';

    // Genera almeno un carattere maiuscolo, un numero e un carattere speciale
    password += uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
    password += numbersCharset[Math.floor(Math.random() * numbersCharset.length)];
    password += specialCharset[Math.floor(Math.random() * specialCharset.length)];

    // Genera il resto della password con caratteri casuali
    for (let i = 0; i < 7; i++) { // aggiungi 5 caratteri casuali
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Mescola la password per rendere l'ordine casuale
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

//@desc get di tutti gli obiettivi
//@route GET /api/goal/
//@access private
const confirm = asyncHandler(async (req, res) => {
    let result = await ResetPassword.checkResetPasswordById({ id: req.params.id });
    if (result.length != 1) {
        res.status(200).send("Hai già confermato, controlla le mail");
        return;
    }

    const email = result[0].email;
    const idu = result[0].idu;
    const password = generatePassword();
    const hashedPassword = hash(password);

    result = await User.changePassword({ idu, password: hashedPassword });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/confirmResetPassword.html")).toString());
    const replacements = {
        email,
        password
    };

    await sendMailer({
        from: process.env.MAIL,
        to: email,
        subject: "STUDENTIME: Generazione password dimenticata",
        body: "",
        html: template(replacements)
    });

    result = await ResetPassword.confirmResetPassword({ id: req.params.id });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send("Controlla le mail");
});

module.exports = { confirm }; 
