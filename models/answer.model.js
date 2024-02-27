const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const TABLE = "answer";

const Answer = {
    insertAnswer: async ({ id_question, desc, idu }) => {
        const result = await connFunction.insert(TABLE, {
            id_user: idu,
            id_question,
            "`desc`": desc,
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        return result;
    },
    updateAnswer: async ({ id, desc }) => {
        const result = await connFunction.update(TABLE, {
            "`desc`": desc,
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
        }, " id=@id ", { id });
        return result;
    },
    deleteAnswer: async ({ id }) => {
        const result = await connFunction.delete(TABLE, " id=@id ", { id });
        return result;
    },
    selectSingleAnswer: async ({ id }) => {
        const mysql = `
        select a.id, u.name, u.surname, a.id_question, a.\`datetime\`, a.desc
        from answer a 
        inner join \`user\` u on u.id like a.id_user
        where a.id=@id;`
        const result = await connFunction.query(mysql, { id });
        return result;
    },
};

module.exports = Answer;