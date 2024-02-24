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

//@desc API per eliminare le question
//@route DELETE /api/question/:id
//@access private
const deleteQuestion = asyncHandler(async (req, res) => {
    const result = await Question.deleteQuestion({ id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Domanda eliminata" });
});

//@desc API per eliminare le question
//@route PUT /api/question/:id
//@access private
const putQuestion = asyncHandler(async (req, res) => {
    const result = await Question.updateQuestion({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Domanda modificata" });
});

module.exports = { addQuestion, deleteQuestion, putQuestion };