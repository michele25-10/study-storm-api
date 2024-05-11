
const asyncHandler = require('express-async-handler');
const Feedback = require('../../models/feedback.model');

//@desc API inserimento feedback dell'utente
//@route POST /api/feedback/
//@access private
const addFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.insertFeedback({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(201).send({ message: "Feedback inserito con successo!" });
});

//@desc API modifica feedback dell'utente
//@route PUT /api/feedback/:id
//@access private
const putFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.putFeedback({ ...req.body, idu: req.user.idu, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Feedback modificata con successo!" });
});

//@desc API eliminazione feedback dell'utente
//@route DELETE /api/feedback/:id
//@access private
const deleteFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.deleteFeedback({ id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Feedback eliminato!" });
});

//@desc API select feedback single feedback
//@route GET /api/feedback/:id
//@access private
const getSingleFeedback = asyncHandler(async (req, res) => {
    const response = await Feedback.selectSingleFeedback({ id: req.params.id });

    res.status(200).send(response);
});

//@desc API select di tutti i feedback filtrabili per data min e max o per idu
//@route GET /api/feedback/:id
//@access private
const getAllFeedback = asyncHandler(async (req, res) => {
    const response = await Feedback.selectAllFeedback({ min: req.query.min, max: req.query.max, idu: req.query.idu });

    res.status(200).send(response);
});


module.exports = { addFeedback, putFeedback, deleteFeedback, getSingleFeedback, getAllFeedback };