const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const TABLE = "answer";

const Answer = {
    insertAnswer: async ({ id_question, desc, idu }) => {
        const result = await connFunction.insert(TABLE, {
            id_user: idu,
            id_question,
            "`desc`": desc,
            datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });
        return result;
    },
    updateAnswer: async ({ id, desc }) => {
        const result = await connFunction.update(TABLE, {
            "`desc`": desc,
            datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }, " id=@id ", { id });
        return result;
    },
    deleteAnswer: async ({ id }) => {
        const result = await connFunction.delete(TABLE, " id=@id ", { id });
        return result;
    },
};

module.exports = Answer;