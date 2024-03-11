const Joi = require('joi');

const addNewsletter = {
    body: Joi.object().keys({
        email: Joi.string().max(60).required(),
        accepted_cookie: Joi.boolean()
    })
};

module.exports = { addNewsletter, };