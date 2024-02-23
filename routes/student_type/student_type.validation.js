const Joi = require('joi');

const getType = {
    query: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = { getType };