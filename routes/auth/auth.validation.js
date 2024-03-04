const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        email: Joi.string().max(60).required(),
        password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
        mobile: Joi.boolean(),
    })
};

const registration = {
    body: Joi.object().keys({
        name: Joi.string().max(20).required(),
        surname: Joi.string().max(20).required(),
        email: Joi.string().max(60).required(),
        tel: Joi.string().max(10).required(),
        password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
        id_student_type: Joi.number().integer().required(),
        course_study: Joi.string().max(30).required(),
        birth_date: Joi.date().required(),
        prof_img: Joi.string().allow(null, ""),
    })
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().max(60).required(),
    })
};

module.exports = { login, registration, forgotPassword };