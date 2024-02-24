const Joi = require('joi');

const createUserGoal = {
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(16).required(),
        admin: Joi.number().integer().allow(0, 1).required(),
    })
};

const getUserGoalByGoal = {
    query: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
    })
};

module.exports = { createUserGoal, getUserGoalByGoal };