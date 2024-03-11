const asyncHandler = require('express-async-handler');
const Newsletter = require('../../models/newsletter.model');

//@desc API inserimento newsletter
//@route POST /api/newsletter/
//@access private
const addNewsletter = asyncHandler(async (req, res) => {
    const result = await Newsletter.insertNewsletter({ email: req.body.email, cookie_accepted: req.body.cookie_accepted || 0 });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Utente salvato nella newsletter!" });
});

module.exports = { addNewsletter };
