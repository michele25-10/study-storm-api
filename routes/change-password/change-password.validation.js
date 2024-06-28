const Joi = require('joi');

const changePassword = {
    query: Joi.object().keys({
        newPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
    }),
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    }),
};

module.exports = { changePassword }