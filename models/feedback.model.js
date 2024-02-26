const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const TABLE = "feedback";

const Feedback = {
    insertFeedback: async ({ idu, description, title }) => {
        const result = await connFunction.insert(TABLE, {
            id_user: idu,
            description,
            title,
            date: moment().format('YYYY-MM-DD')
        });
        return result;
    },
};

module.exports = Feedback;