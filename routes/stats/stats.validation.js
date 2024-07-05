const Joi = require('joi');

const getStatsHourStudy = {
    query: Joi.object().keys({
        min: Joi.date(),
        max: Joi.date(),
        type: Joi.string().valid("Settimana", "Mese", "Anno").required(),
    })
};

const getStudyInfoHistory = {
    params: Joi.object().keys({
        id_goal: Joi.number(),
    })
};

module.exports = { getStatsHourStudy, getStudyInfoHistory };