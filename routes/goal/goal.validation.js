const Joi = require('joi');

const getAllGoals = {
    query: Joi.object().keys({
        alsoFinished: Joi.boolean(),
        tasks: Joi.boolean()
    })
};

const createGoal = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        expected_grade: Joi.number().allow(null, ""),
        grade: Joi.number().allow(null, ""),
        admin: Joi.number().integer(),
        color: Joi.string().pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/).allow(null, "")
    })
};

const getGoal = {
    query: Joi.object().keys({
        alsoFinished: Joi.boolean(),
    }),
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
};

const updateGoal = {
    body: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        expected_grade: Joi.number().allow(null, ""),
        grade: Joi.number().allow(null, ""),
        color: Joi.string().pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/).allow(null, "")
    })
};

const updateFinished = {
    parmas: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        finished: Joi.number().allow(0, 1).required(),
    })
};

const addMinutes = {
    body: Joi.object().keys({
        minutes: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
    })
};

const deleteGoal = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = { getAllGoals, createGoal, getGoal, updateGoal, updateFinished, addMinutes, deleteGoal };