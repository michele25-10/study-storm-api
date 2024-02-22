const Joi = require('joi');

const getAllUsers = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
    })
};

const getUser = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
        idu: Joi.string().length(16).required(),
    })
};

module.exports = { getAllUsers, getUser };