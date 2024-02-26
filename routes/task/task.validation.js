const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        id_goal: Joi.number().integer().required()
    })
};

const getTask = {
    query: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const updateTask = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        id: Joi.number().integer().required(),
        id_goal: Joi.number().integer().required()
    })
};

const addMinutes = {
    body: Joi.object().keys({
        minutes: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
    })
};

const deleteTask = {
    body: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = { createTask, getTask, updateTask, addMinutes, deleteTask };