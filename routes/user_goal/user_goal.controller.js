const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user_goal.model');

//@desc get di tutti le associazioni utente-obiettivo
//@route GET /api/user_goal/
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
//@route POST /api/user_goal/createUserGoal
//@access private
const createUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.createUserGoal({ ...req.body });

    if (result.affectedRows != 1){
        res.status(404);
        throw new Error();
    }

    res.status(201).send({ message: "Gruppo creato" });
});

//@desc ottiene l'associazione in base all'obiettivio
//@route GET /api/user_goal/getUserGoalByGoal
//@access private
const getUserGoalByGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.selectUserGoalByGoal({ id_goal: req.query.id_goal });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc ottiene l'associazione in base all'obiettivio
//@route GET /api/user_goal/getUserGoalByGoal
//@access private
const getUserGoalByUser = asyncHandler(async (req, res) => {
    const result = await UserGoal.selectUserGoalByUser({ id_user: req.query.id_user });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route GET /api/user_goal/getUserGoal
//@access private
const getUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.selectUserGoal({ id_user: req.query.id_user, id_goal: req.query.id_goal });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route PUT /api/user_goal/updateAdmin
//@access private
const updateAdmin = asyncHandler(async (req, res) => {
    const result = await UserGoal.updateAdmin({ ...req.body });

    if (result.affectedRows != 1){
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Admin aggiornato"});
});

module.exports = { getAllUserGoal, createUserGoal, getUserGoalByGoal, getUserGoalByUser, getUserGoal, updateAdmin };