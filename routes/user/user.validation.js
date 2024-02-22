const Joi = require('joi');

const getAllUsers = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
    })
};

module.exports = { getAllUsers };