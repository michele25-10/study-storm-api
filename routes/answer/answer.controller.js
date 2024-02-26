const asyncHandler = require('express-async-handler');
const Answer = require('../../models/answer.model');

//@desc API inserimento response utente ad una question
//@route POST /api/answer/
//@access private
const addAnswer = asyncHandler(async (req, res) => {
    const result = await Answer.insertAnswer({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Risposta inserita con successo!" });
});

module.exports = { addAnswer };