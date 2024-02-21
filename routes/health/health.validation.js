const Joi = require('joi');

const healthBackendCheck = {
    query: Joi.object().keys({
        healt: Joi.boolean().default(true),
    }),
};

module.exports = { healthBackendCheck };