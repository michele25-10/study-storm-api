const Joi = require('joi');

const getType = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

// const createType = {
//     body: Joi.object().keys({
//         name: Joi.string().max(20).required(),
//     })
// };

// const updateType = {
//     body: Joi.object().keys({
//         name: Joi.string().max(20).required(),
//         id: Joi.number().integer().required(),
//     })
// };

module.exports = { getType, /* createType, updateType */ };