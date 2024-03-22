const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        id_goal: Joi.number().integer().required(),
        color: Joi.string().pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/).allow(null, "")
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
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        id_goal: Joi.number().integer().required(),
        color: Joi.string().pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/).allow(null, "")
    })
};

const addMinutes = {
    body: Joi.object().keys({
        minutes: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
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

module.exports = { createTask, getTask, getAllTasks, updateTask, addMinutes, deleteTask };