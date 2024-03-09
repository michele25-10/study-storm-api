const Joi = require('joi');

const verifyInvite = {
    query: Joi.object().keys({
        verification_key: Joi.string().length(36).required(),
    })
}

module.exports = {
    verifyInvite,
}