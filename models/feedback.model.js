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
    putFeedback: async ({ idu, description, title, id }) => {
        const result = await connFunction.update(TABLE, {
            id_user: idu,
            description,
            title,
            date: moment().format('YYYY-MM-DD')
        }, "id=@id", { id });
        return result;
    },
    deleteFeedback: async ({ id }) => {
        const result = await connFunction.delete(TABLE, " id=@id", { id });
        return result;
    }
};

module.exports = Feedback;