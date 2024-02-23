const Joi = require('joi');

const getType = {
    query: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const createType = {
    body: Joi.object().keys({
        name: Joi.string().max(20).required(),
    })
};

module.exports = { getType, createType };