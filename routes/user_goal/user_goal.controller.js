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


module.exports = { getAllUserGoal, createUserGoal, getUserGoalByGoal };