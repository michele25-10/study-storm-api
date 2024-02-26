const Joi = require('joi');

const addAnswer = {
    body: Joi.object().keys({
        id_question: Joi.number().integer().required(),
        desc: Joi.string().max(512).required(),
    })
};

module.exports = { addAnswer };