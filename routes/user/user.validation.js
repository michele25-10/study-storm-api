const Joi = require('joi');

const getAllUsers = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
    })
};

const getUser = {
    query: Joi.object().keys({
        idu: Joi.string().length(36).required(),
        alsoDisactive: Joi.boolean(),
    })
};

const getUserByEmail = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
        email: Joi.string().max(60).required(),
    })
};

const updateUser = {
    body: Joi.object().keys({
        tel: Joi.string().max(10).required(),
        course_study: Joi.string().max(30).required(),
        birth_date: Joi.date().required(),
        idu: Joi.string().length(36).required(),
    })
};

const deleteUser = {
    body: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    })
};

module.exports = { getAllUsers, getUser, getUserByEmail, updateUser, deleteUser };