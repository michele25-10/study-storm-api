const Joi = require('joi');

const getSingleReport = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const addReportUser = {
    body: Joi.object().keys({
        id: Joi.number().integer().required(),  //id_question or id_answer
        id_report: Joi.number().integer().required(),
        question: Joi.boolean().required(),
    })
};


module.exports = { getSingleReport, addReportUser };