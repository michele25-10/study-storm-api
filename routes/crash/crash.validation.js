const Joi = require('joi');

const postCrashInformation = {
    body: Joi.object().keys({
        idu: Joi.string().max(36).required(),
        info: Joi.string().required(),
    })
};

module.exports = { postCrashInformation };