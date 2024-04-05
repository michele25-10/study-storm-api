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
        note: Joi.string().max(512).allow("", null).required(),
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

const getAllAgenda = {
    query: Joi.object().keys({
        id_task: Joi.number().integer().required(),
        date: Joi.date(),
    })
};

module.exports = { addAgenda, putAgenda, deleteAgenda, getSingleAgenda, getAllAgenda };