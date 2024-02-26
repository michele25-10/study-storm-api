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

//@desc API modifica response utente ad una question
//@route PUT /api/answer/:id
//@access private
const putAnswer = asyncHandler(async (req, res) => {
    const result = await Answer.updateAnswer({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Risposta modificata con successo!" });
});

//@desc API eliminare risposta
//@route DELETE /api/answer/:id
//@access private
const deleteAnswer = asyncHandler(async (req, res) => {
    const result = await Answer.deleteAnswer({ id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Risposta eliminata con successo!" });
});

//@desc API get di una singola answer
//@route GET /api/answer/:id
//@access private
const getSingleAnswer = asyncHandler(async (req, res) => {
    const response = await Answer.selectSingleAnswer({ id: req.params.id });
    res.status(200).send(response);
});

module.exports = { addAnswer, putAnswer, deleteAnswer, getSingleAnswer };