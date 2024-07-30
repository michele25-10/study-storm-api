const Joi = require('joi');

const getAllGoals = {
    query: Joi.object().keys({
        finished: Joi.boolean(),
        tasks: Joi.boolean()
    })
};

const createGoal = {
    body: Joi.object().keys({
        name: Joi.string().max(40).required(),
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        flag_grade: Joi.number().integer().allow(0, 1).required(),
        expected_grade: Joi.number().allow(null, '').when('flag_grade', {
            is: 1,
            then: Joi.required().not(null, ''), // required e non nullo quando flag_grade è 1
            otherwise: Joi.optional()
        }), grade: Joi.number().allow(null, ""),
        grade: Joi.number().allow(null, ""),
        max_grade: Joi.number().allow(null, '').when('flag_grade', {
            is: 1,
            then: Joi.required().not(null, ''), // required e non nullo quando flag_grade è 1
            otherwise: Joi.optional()
        }),
        admin: Joi.number().integer(),
        id_palette: Joi.number().allow(null, "")
    })
};

const getGoal = {
    query: Joi.object().keys({
        alsoFinished: Joi.boolean(),
        tasks: Joi.boolean()
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
        expiry_date: Joi.date().allow(null, ""),
        planned_minutes: Joi.number().integer().allow(null, ""),
        minutes: Joi.number().integer().allow(null, ""),
        flag_grade: Joi.number().integer().allow(0, 1).required(),
        expected_grade: Joi.number().allow(null, '').when('flag_grade', {
            is: 1,
            then: Joi.required().not(null, ''), // required e non nullo quando flag_grade è 1
            otherwise: Joi.optional()
        }), grade: Joi.number().allow(null, ""),
        grade: Joi.number().allow(null, ""),
        max_grade: Joi.number().allow(null, '').when('flag_grade', {
            is: 1,
            then: Joi.required().not(null, ''), // required e non nullo quando flag_grade è 1
            otherwise: Joi.optional()
        }),
        id_palette: Joi.number().allow(null, ""),
    })
};

const updateFinished = {
    parmas: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        finished: Joi.number().allow(0, 1).required(),
        grade: Joi.number().integer().allow(null),
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