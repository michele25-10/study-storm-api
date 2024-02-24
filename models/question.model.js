const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "question";

const Question = {
    insertQuestion: async ({ desc, title, idu }) => {
        const result = await connFunction.insert(TABLE, {
            "`desc`": desc,
            title,
            id_user: idu,
            datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });
        return result;
    }
}

module.exports = Question;