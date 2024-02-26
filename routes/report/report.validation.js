const Joi = require('joi');

const getSingleReport = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};


module.exports = { getSingleReport };