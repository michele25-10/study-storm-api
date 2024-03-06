const Joi = require('joi');

const getStatsHourStudy = {
    params: Joi.object().keys({
        idu: Joi.string().required(),
    }),
    query: Joi.object().keys({
        min: Joi.date(),
        max: Joi.date(),
    })
};

module.exports = { getStatsHourStudy };