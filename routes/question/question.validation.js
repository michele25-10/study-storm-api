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


module.exports = { addQuestion, deleteQuestion, putQuestion };