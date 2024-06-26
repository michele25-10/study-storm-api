const asyncHandler = require('express-async-handler');
const Goal = require('../../models/goal.model');
const Task = require('../../models/task.model');
const UserGoal = require('../../models/user-goal.model');

//@desc get di tutti gli obiettivi
//@route GET /api/goal/
//@access private
const getAllGoals = asyncHandler(async (req, res) => {
    let response = await Goal.selectAllGoals({ alsoFinished: req.query.alsoFinished || false, idu: req.user.idu });

    for (const row of response) {
        row.percentuage = Math.round((row.minutes / row.planned_minutes) * 100);
        if (req.query.tasks) {
            const tasks = await Task.selectAllTasks({ id_goal: row.id });
            row.tasks = tasks;
        }
    }

    res.status(200).send(response);
});

//@desc creazione di un obiettivo
//@route POST /api/goal
//@access private
const createGoal = asyncHandler(async (req, res) => {
    if (req.body.expiry_date != null && req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error("Data di scadenza già superata");
    }

    const result = await Goal.createGoal({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    const goalId = result.insertId;

    result = UserGoal.createUserGoal({ id_user: req.user.idu, id_goal: goalId, admin: req.body.admin || 0 });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(201).send({ message: "Obiettivo creato" });
});

//@desc get un obiettivo dato un id
//@route GET /api/goal/:id
//@access private
const getGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

    let response = await Goal.selectGoal({ alsoDisactive: req.query.alsoDisactive || false, id: req.params.id });

    if (response.length == 0) {
        res.status(404);
        throw new Error("Goal non trovato");
    }

    if (req.query.tasks) {
        for (const row of response) {
            const task = await Task.selectAllTasks({ id_goal: row.id });
            row.tasks = task;
        }
    }

    res.status(200).send(response);
});

//@desc modifica di un obiettivo
//@route PUT /api/goal/updateGoal
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

    if (req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error("La scadenza è già passata");
    }

    result = await Goal.updateGoal({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(201).send({ message: "Obiettivo modificato" });
});

//@desc aggiorna il valore di admin
//@route PUT /api/user-goal/updateAdmin
//@access private
const updateFinished = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

    result = await Goal.updateFinished({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error("Goal non trovato");
    }

    res.status(200).send({ message: "Obiettivo aggiornato" });
});

//@desc elimina un obiettivo
//@route PUT /api/goal/
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error("Non hai i permessi");
    }

    result = await Goal.deleteGoal({ ...req.params });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error("Goal non trovato");
    }

    res.status(200).send({ message: "Obiettivo eliminato" });
});

//@desc get di tutti i nomi e colori degli obiettivi
//@route GET /api/goal/name/
//@access private
const getAllGoalsName = asyncHandler(async (req, res) => {
    const response = await Goal.selectAllGoalsName({ idu: req.user.idu });

    res.status(200).send(response);
});

module.exports = { getAllGoals, createGoal, getGoal, updateGoal, updateFinished, deleteGoal, getAllGoalsName };