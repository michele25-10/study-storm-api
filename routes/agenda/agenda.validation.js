const Joi = require('joi');

const addAgenda = {
    body: Joi.object().keys({
        date: Joi.date().required(),
        note: Joi.string().max(512).required(),
        minutes: Joi.number().integer().required(),
        id_task: Joi.number().integer().required(),
    })
};

module.exports = { addAgenda };