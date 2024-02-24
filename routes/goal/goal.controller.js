const asyncHandler = require('express-async-handler');
const Goal = require('../../models/goal.model');

//@desc get di tutti gli obiettivi
//@route GET /api/goal/
//@access private
const getAllGoals = asyncHandler(async (req, res) => {
    const result = await Goal.selectAllGoals({ alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc creazione di un obiettivo
//@route POST /api/goal/createGoal
//@access private
const createGoal = asyncHandler(async (req, res) => {
    if (req.body.expiry_date < new Date()){
        res.status(400);
        throw new Error();
    }

    const result = await Goal.createGoal({...req.body});

    if (result.affectedRows != 1){
        res.status(400);
        throw new Error();
    }

    res.status(201).send({ message: "Obiettivo creato" });
});

//@desc get un obiettivo dato un id
//@route GET /api/goal/getGoal
//@access private
const getGoal = asyncHandler(async (req, res) => {
    const result = await Goal.selectGoal({ alsoDisactive: req.query.alsoDisactive || false, id:req.query.id });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

module.exports = { getAllGoals, createGoal, getGoal };