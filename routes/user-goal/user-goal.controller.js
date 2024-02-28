const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user-goal.model');

//@desc get di tutti le associazioni utente-obiettivo
//@route GET /api/user-goal/
//@access private
const getAllUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.selectAllUserGoal();

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc creazione di un'associazione utente-obiettivo
//@route POST /api/user-goal
//@access private
const createUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.createUserGoal({ ...req.body });

    if (result.affectedRows != 1){
        res.status(404);
        throw new Error();
    }

    res.status(201).send({ message: "Gruppo creato" });
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route PUT /api/user-goal/
//@access private
const updateAdmin = asyncHandler(async (req, res) => {
    const result = await UserGoal.updateAdmin({ ...req.body });

    if (result.affectedRows != 1){
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Admin aggiornato"});
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route DELETE /api/user-goal/
//@access private
const deleteUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.deleteUserGoal({ ...req.body });

    if (result.affectedRows != 1){
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Eliminato"});
});

//@desc ottiene l'associazione in base all'obiettivio
//@route GET /api/user-goal/filter
//@access private
const filter = asyncHandler(async (req, res) => {
    const result = await UserGoal.filter({ id_goal: req.query.id_goal || false, id_user: req.query.id_user || false});

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

module.exports = { getAllUserGoal, createUserGoal, updateAdmin, deleteUserGoal, filter };