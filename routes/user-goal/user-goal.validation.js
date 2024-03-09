const Joi = require('joi');

const createUserGoal = {
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required(),
        id_user: Joi.string().length(36).required(),
        admin: Joi.number().integer().allow(0, 1).required(),
    })
};

const filter = {
    query: Joi.object().keys({
        id_goal: Joi.number().integer(),
        id_user: Joi.string().length(36),
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

const invite = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        
        users: Joi.array().items({
            idu: Joi.string().length(36).required(),
            email: Joi.string().max(60).required(),
        }).required()
    })
};

module.exports = { 
    createUserGoal, 
    updateAdmin,
    deleteUserGoal,
    filter,
    invite,
};