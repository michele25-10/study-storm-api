const Joi = require('joi');

const addQuestion = {
    body: Joi.object().keys({
        desc: Joi.string().max(128).required(),
        title: Joi.string().max(40).required(),
    })
};

const deleteQuestion = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const putQuestion = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        desc: Joi.string().max(128).required(),
        title: Joi.string().max(40).required(),
    })
};

const getSingleQuestion = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getFeedQuestion = {
    query: Joi.object().keys({
        min: Joi.date(),
        max: Joi.date().max('now'),
        search: Joi.string(),
        limit: Joi.number().integer(),
        id_student_type: Joi.number().integer(),
    })
};

module.exports = { addQuestion, deleteQuestion, putQuestion, getSingleQuestion, getFeedQuestion };