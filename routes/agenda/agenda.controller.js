
const asyncHandler = require('express-async-handler');
const Agenda = require('../../models/agenda.model');
const Task = require('../../models/task.model');
const Goal = require('../../models/goal.model');
const UserTaskAgenda = require('../../models/user-task-agenda.model');
const moment = require('moment');
const { months } = require('../../enums/date');


//@desc API inserimento agenda di una task da parte di un utente
//@route POST /api/agenda/
//@access private
const addAgenda = asyncHandler(async (req, res) => {
    //Controllo se l'utente è associato all'obiettivo al quale cerca di aggiungere una agenda
    let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: req.body.id_task });

    if (check.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }
    const idGoal = check[0].idGoal;

    //Un utente non deve poter inserire più agende nella stessa data 
    check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date });
    if (check.length != 0) {
        const idAgenda = check[0].id;
        let result = await Agenda.updateAgenda({
            date: req.body.date,
            note: req.body.note,
            minutes: req.body.minutes,
            id: idAgenda
        });
        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error("Errore inaspettato");
        }
    } else {
        //Agenda non esiste in tale data all'ora la aggiungo
        let result = await Agenda.insertAgenda({
            date: req.body.date,
            note: req.body.note,
            minutes: req.body.minutes,
        });
        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error("Errore inaspettato");
        }

        const idAgenda = result.insertId;

        //Creo un record nella tabella di mezzo
        result = await UserTaskAgenda.insertUserTaskAgenda({ idu: req.user.idu, id_task: req.body.id_task, id_agenda: idAgenda })
        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error("Errore inaspettato");
        }
    }
    // aggiornamento minuti totali sulle task e sui goal
    result = await Task.updateMinutes({ id_task: req.body.id_task });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }
    result = await Goal.updateMinutes({ id_goal: idGoal });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(201).send({ message: "Agenda inserita con successo!" });
});

//@desc API modifica di una agenda 
//@route PUT /api/feedback/:id
//@access private
const putAgenda = asyncHandler(async (req, res) => {
    //Controllo se l'utente è associato all'obiettivo al quale cerca di aggiungere una agenda
    let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: req.body.id_task });
    if (check.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi per modificare questa agenda");
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
        throw new Error("Errore inaspettato");
    }

    // aggiornamento minuti totali sulle task e sui goal
    const idTask = await UserTaskAgenda.selectIdTaskByAgenda({ id_agenda: req.params.id })
    result = await Task.updateMinutes({ id_task: idTask });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }
    result = await Goal.updateMinutes({ id_goal: idGoal });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Agenda modificata con successo!" });
});

//@desc API eliminazione di una agenda 
//@route DELETE /api/feedback/:id
//@access private
const deleteAgenda = asyncHandler(async (req, res) => {
    response = await Agenda.selectSingleAgenda({ id: req.params.id, user: req.user.idu });
    if (response.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

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
    let response = await Agenda.selectSingleAgenda({ id: req.params.id, user: req.user.idu });
    if (response.length === 0) {
        response = await Agenda.selectSingleAgenda({ id: req.params.id });
        if (response.length != 1) {
            res.status(404);
            throw new Error("Agenda inesistente");
        }
        const idTask = response[0].id_task;

        //Controllo se l'utente è associato all'obiettivo al quale cerca di aggiungere una agenda
        let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: idTask });
        if (check.length != 1) {
            res.status(403);
            throw new Error("Non hai i permessi");
        }

        //Se non sei admin dell'obiettivo rifai la query aggiungendo il filtro utente
        if (!check[0].admin) {
            res.status(403);
            throw new Error("Non hai i permessi");
        }
    }

    res.status(200).send(response);
});

//@desc API get di agenda con filtro per utente o per task 
//@route GET /api/feedback/
//@access private
const getAllAgenda = asyncHandler(async (req, res) => {
    let response = {};
    let check = await Agenda.isAuthorizedUserAddAgenda({ idu: req.user.idu, id_task: req.query.id_task });
    if (check.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

    if (check[0].admin) {
        response.personal = await Agenda.selectAllAgenda({
            admin: false,
            idu: req.user.idu,
            date: req.query.date,
            id_task: req.query.id_task
        });
        response.team = await Agenda.selectAllAgenda({
            admin: true,
            idu: req.user.idu,
            date: req.query.date,
            id_task: req.query.id_task
        });
    } else {
        response.personal = await Agenda.selectAllAgenda({
            admin: false,
            idu: req.user.idu,
            date: req.query.date,
            id_task: req.query.id_task
        });
    }

    res.status(200).send(response);
});

//@desc API get di agenda calendario con numero ore per ogni giorno all'indietro di tot giorni
//@route GET /api/feedback/
//@access private
const getAgendaCalendar = asyncHandler(async (req, res) => {
    let response = [];
    const days = req.query.days ? req.query.days : 30;

    let result = await Agenda.getAgendaCalendar({ days, idu: req.user.idu });

    for (const row of result) {
        let isPresent = false;
        for (const item of response) {
            if (moment(row.date).isSame(moment(item.date))) {
                isPresent = true;
            }
        }

        if (!isPresent) {
            let dataObject = {};
            dataObject.date = row.date;
            dataObject.day = moment(row.date).date();
            row.month = moment(row.date).month();
            dataObject.month = months[row.month];
            dataObject.year = moment(row.date).year();
            dataObject.agenda = [];
            for (const i in result) {
                if (moment(result[i].date).isSame(moment(row.date))) {
                    dataObject.agenda.push({
                        minutes: result[i].minutes,
                        id_agenda: result[i].id_agenda,
                        id_task: result[i].id_task,
                        id_goal: result[i].id_goal,
                        primary_color: result[i].primary_color,
                        secondary_color: result[i].secondary_color,
                        name: result[i].name,
                        name_task: result[i].name_task
                    });
                }
            }
            response.push(dataObject);
        }
    }

    res.status(200).send(response);
});

module.exports = { addAgenda, putAgenda, deleteAgenda, getSingleAgenda, getAllAgenda, getAgendaCalendar };