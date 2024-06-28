const Joi = require('joi');

const changePassword = {
    query: Joi.object().keys({
        newPassword: Joi.string().min(64).max(64).required(),
    }),
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    }),
};

module.exports = { changePassword }