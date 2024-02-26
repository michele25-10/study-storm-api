
const asyncHandler = require('express-async-handler');
const Feedback = require('../../models/feedback.model');

//@desc API inserimento feedback dell'utente
//@route POST /api/feedback/
//@access private
const addFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.insertFeedback({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Feedback inserito con successo!" });
});

module.exports = { addFeedback };