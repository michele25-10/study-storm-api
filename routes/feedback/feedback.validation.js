const Joi = require('joi');

const addFeedback = {
    body: Joi.object().keys({
        description: Joi.string().max(512).required(),
        title: Joi.string().max(30).required(),
    })
};


module.exports = { addFeedback };