const asyncHandler = require('express-async-handler');
const Question = require('../../models/question.model');

//@desc API inserimento question utente
//@route POST /api/question/
//@access private
const addQuestion = asyncHandler(async (req, res) => {
    const result = await Question.insertQuestion({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Domanda inserita con successo!" });
});


module.exports = { addQuestion };