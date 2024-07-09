const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        minutes: Joi.number().integer().allow(null, ""),
        id_goal: Joi.number().integer().required(),
    })
};

const getTask = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getAllTasks = {
    params: Joi.object().keys({
        id_goal: Joi.number().integer(),
    })
};

const updateTask = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        id_goal: Joi.number().integer().required(),
    })
};

const finishedTask = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }), body: Joi.object().keys({
        finished: Joi.boolean().required(),
    })
};

const deleteTask = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        id_goal: Joi.number().integer().required()
    })
};

module.exports = { createTask, getTask, getAllTasks, updateTask, finishedTask, deleteTask };