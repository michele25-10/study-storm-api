
const asyncHandler = require('express-async-handler');
const Agenda = require('../../models/agenda.model');
const UserTaskAgenda = require('../../models/user-task-agenda.model');

//@desc API inserimento agenda di una task da parte di un utente
//@route POST /api/agenda/
//@access private
const addAgenda = asyncHandler(async (req, res) => {
    const check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date });
    if (check.length != 0) {
        res.status(200).send({ message: "Agenda già esistente" });
        return;
    }

    let result = await Agenda.insertAgenda({
        date: req.body.date,
        note: req.body.note,
        minutes: req.body.minutes,
    });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    const idAgenda = result.insertId;

    result = await UserTaskAgenda.insertUserTaskAgenda({ idu: req.user.idu, id_task: req.body.id_task, id_agenda: idAgenda })

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }
    res.status(201).send({ message: "Agenda inserita con successo!" });
});

//@desc API modifica di una agenda 
//@route PUT /api/feedback/:id
//@access private
const putAgenda = asyncHandler(async (req, res) => {
    const check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date, id_agenda: req.params.id });
    if (check.length != 0) {
        res.status(200).send({ message: "Data occupata da un'altra agenda" });
        return;
    }

    const result = await Agenda.updateAgenda({ ...req.body, id: req.params.id });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(200).send({ message: "Agenda modificata con successo!" });
});

//@desc API eliminazione di una agenda 
//@route DELETE /api/feedback/:id
//@access private
const deleteAgenda = asyncHandler(async (req, res) => {
    const result = await Agenda.deleteAgenda({ id: req.params.id });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Agenda non trovata");
    }

    res.status(200).send({ message: "Agenda eliminata!" });
});

//@desc API get di una singola agenda 
//@route GET /api/feedback/:id
//@access private
const getSingleAgenda = asyncHandler(async (req, res) => {
    const response = await Agenda.selectSingleAgenda({ id: req.params.id });

    res.status(200).send(response);
});

module.exports = { addAgenda, putAgenda, deleteAgenda, getSingleAgenda };