const Joi = require('joi');

const getAllGoals = {
    query: Joi.object().keys({
        alsoFinished: Joi.boolean(),
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
    })
};

const getGoal = {
    query: Joi.object().keys({
        alsoFinished: Joi.boolean(),
        id: Joi.number().integer().required(),
    })
};

const updateGoal = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        desc: Joi.string().max(64).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        expected_grade: Joi.number().allow(null, ""),
        grade: Joi.number().allow(null, ""),
        id: Joi.number().integer().required(),
    })
};

module.exports = { getAllGoals, createGoal, getGoal, updateGoal };