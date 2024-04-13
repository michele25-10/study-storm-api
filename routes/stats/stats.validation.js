const Joi = require('joi');

const getStatsHourStudy = {
    query: Joi.object().keys({
        min: Joi.date(),
        max: Joi.date(),
        type: Joi.string().valid("Settimana", "Mese", "Anno").required(),
    })
};

module.exports = { getStatsHourStudy };