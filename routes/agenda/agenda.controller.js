
const asyncHandler = require('express-async-handler');
const Agenda = require('../../models/agenda.model');
const Task = require('../../models/task.model');
const Goal = require('../../models/goal.model');
const UserTaskAgenda = require('../../models/user-task-agenda.model');

//@desc API inserimento agenda di una task da parte di un utente
//@route POST /api/agenda/
//@access private
const addAgenda = asyncHandler(async (req, res) => {
    //Controllo se l'utente è associato all'obiettivo al quale cerca di aggiungere una agenda
    let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: req.body.task });
    if (check.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi per inserire questa agenda");
    }
    const idGoal = check[0].idGoal;

    //Un utente non deve poter inserire più agende nella stessa data 
    check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date });
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

    //Creo un record nella tabella di mezzo
    result = await UserTaskAgenda.insertUserTaskAgenda({ idu: req.user.idu, id_task: req.body.id_task, id_agenda: idAgenda })
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    // aggiornamento minuti totali sulle task e sui goal
    result = await Task.updateMinutes({ id_task: req.body.id_task });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }
    result = await Goal.updateMinutes({ id_goal: idGoal });
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
    //Controllo se l'utente è associato all'obiettivo al quale cerca di aggiungere una agenda
    let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: req.body.task });
    if (check.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi per inserire questa agenda");
    }
    const idGoal = check[0].idGoal;

    //controllo che non ci siano doppioni in quella data
    check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date, id_agenda: req.params.id });
    for (const row of check) {
        if (row.id != req.params.id) {
            res.status(200).send({ message: "Data occupata da un'altra agenda" });
            return;
        }
    }

    //Modifico l'agenda 
    let result = await Agenda.updateAgenda({ ...req.body, id: req.params.id });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    // aggiornamento minuti totali sulle task e sui goal
    const idTask = await UserTaskAgenda.selectIdTaskByAgenda({ id_agenda: req.params.id })
    result = await Task.updateMinutes({ id_task: idTask });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }
    result = await Goal.updateMinutes({ id_goal: idGoal });
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

//@desc API get di agenda con filtro per utente o per task 
//@route GET /api/feedback/
//@access private
const getAllAgenda = asyncHandler(async (req, res) => {
    const response = await Agenda.selectAllAgenda({
        admin: req.query.admin || false,
        idu: req.user.idu,
        date: req.query.date,
        id_task: req.query.id_task
    });

    res.status(200).send(response);
});


module.exports = { addAgenda, putAgenda, deleteAgenda, getSingleAgenda, getAllAgenda };