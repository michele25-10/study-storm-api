const asyncHandler = require('express-async-handler');
//const Goal = require('../../models/goal.model');
//const Task = require('../../models/task.model');
//const UserGoal = require('../../models/user-goal.model');

//@desc get di tutti gli obiettivi
//@route GET /api/goal/
//@access private
const confirm = asyncHandler(async (req, res) => {

    res.status(200).send("Controlla le mail");
});

module.exports = { confirm }; 
