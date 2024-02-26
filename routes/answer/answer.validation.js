const Joi = require('joi');

const addAnswer = {
    body: Joi.object().keys({
        id_question: Joi.number().integer().required(),
        desc: Joi.string().max(512).required(),
    })
};

const putAnswer = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        desc: Joi.string().max(512).required(),
    })
};

const deleteAnswer = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getSingleAnswer = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = { addAnswer, putAnswer, deleteAnswer, getSingleAnswer };