const Joi = require('joi');

const createUserGoal = {
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(36).required(),
        admin: Joi.number().integer().allow(0, 1).required(),
    })
};

const getUserGoalByGoal = {
    query: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
    })
};

const getUserGoalByUser = {
    query: Joi.object().keys({
        id_user: Joi.string().length(36).required(),
        order: Joi.boolean()
    })
};

const getUserGoal = {
    query: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(36).required(),
    })
};

const updateAdmin = {
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(36).required(),
        admin: Joi.number().integer().allow(0, 1).required(),
    })
};

const deleteUserGoal = {
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(36).required(),
    })
};

module.exports = { 
    createUserGoal, 
    getUserGoalByGoal, 
    getUserGoalByUser, 
    getUserGoal, 
    updateAdmin,
    deleteUserGoal
};