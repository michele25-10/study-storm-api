const Joi = require('joi');

const addFeedback = {
    body: Joi.object().keys({
        description: Joi.string().max(512).required(),
        title: Joi.string().max(30).required(),
    })
};

const putFeedback = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        description: Joi.string().max(512).required(),
        title: Joi.string().max(30).required(),
    })
};

const deleteFeedback = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getSingleFeedback = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getAllFeedback = {
    query: Joi.object().keys({
        idu: Joi.string().allow(null, ""),
        max: Joi.date(),
        min: Joi.date()
    })
};


module.exports = { addFeedback, putFeedback, deleteFeedback, getSingleFeedback, getAllFeedback };