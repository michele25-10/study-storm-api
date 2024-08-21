const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { mailDeveloper } = require('../../enums/developerMail');
const sendMailer = require('../../utils/mail');

//@desc API post delle informazioni del crash dell'app
//@route POST /api/crash/
//@access private
const postCrashInformation = asyncHandler(async (req, res) => {
    const check = await User.selectUser({ idu: req.body.idu });
    if (check.length != 1) {
        res.status(400);
        throw new Error("IDU non valido");
    }

    const ip = req.ip;
    const agent = req.headers['user-agent'];

    for (const mail of mailDeveloper) {
        await sendMailer({
            from: process.env.MAIL,
            to: mail,
            subject: "CRASH STUDY STORM APP",
            text: req.body.info + "\n\n" + ip + "\n" + agent + "\n",
            html: ""
        });
    }

    res.status(200).send({ message: "Mail inviata con successo" });
});

module.exports = { postCrashInformation };
