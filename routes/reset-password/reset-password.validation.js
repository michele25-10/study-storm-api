const Joi = require('joi');

const confirm = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    })
};

module.exports = { confirm };