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
    },
    deleteQuestion: async ({ id }) => {
        const result = await connFunction.delete(TABLE, 'id=@id', { id });
        return result;
    },
    updateQuestion: async ({ id, desc, title }) => {
        const result = await connFunction.update(TABLE, {
            "`desc`": desc,
            title,
            datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }, "id=@id", { id });
        return result;
    },
    selectSingleQuestion: async ({ id }) => {
        const mysql = `select q.id, q.\`desc\`, q.title, q.\`datetime\`, u.name, u.surname 
        from question q 
        inner join \`user\` u on u.id = q.id_user 
        where q.id=@id;`;
        const result = await connFunction.query(mysql, { id });
        return result;
    }
};

module.exports = Question;