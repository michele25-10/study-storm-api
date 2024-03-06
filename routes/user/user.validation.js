const Joi = require('joi');

const getAllUsers = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
    })
};

const getUser = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
    }),
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    }),
};

const getUserByEmail = {
    query: Joi.object().keys({
        alsoDisactive: Joi.boolean(),
        email: Joi.string().max(60).required(),
    })
};

const updateUser = {
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    }),
    body: Joi.object().keys({
        tel: Joi.string().max(10).required(),
        course_study: Joi.string().max(30).required(),
        birth_date: Joi.date().required(),
    })
};

const deleteUser = {
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    })
};

const changePassword = {
    params: Joi.object().keys({
        idu: Joi.string().length(36).required(),
    }),
    body: Joi.object().keys({
        newPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().strict()
    })
};

module.exports = { getAllUsers, getUser, getUserByEmail, updateUser, deleteUser, changePassword };