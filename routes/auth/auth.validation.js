const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        email: Joi.string().max(60).required(),
        password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
        mobile: Joi.boolean(),
    })
};

module.exports = { login };