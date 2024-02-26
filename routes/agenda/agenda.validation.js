const Joi = require('joi');

const addAgenda = {
    body: Joi.object().keys({
        date: Joi.date().required(),
        note: Joi.string().max(512).required(),
        minutes: Joi.number().integer().required(),
        id_task: Joi.number().integer().required(),
    })
};

const putAgenda = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        date: Joi.date().required(),
        note: Joi.string().max(512).required(),
        minutes: Joi.number().integer().required(),
    })
};

const deleteAgenda = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getSingleAgenda = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = { addAgenda, putAgenda, deleteAgenda, getSingleAgenda };