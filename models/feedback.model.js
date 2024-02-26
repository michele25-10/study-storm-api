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
    },
    selectSingleFeedback: async ({ id }) => {
        const mysql = "select id, id_user, description, title, date from feedback where id=@id";
        const result = await connFunction.query(mysql, { id });
        return result;
    },
    selectAllFeedback: async ({ min, max, idu }) => {
        const mysql = `
        select id, id_user, description, title, date
        from feedback 
        where ${min && max ? " date between @min and @max " : " date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR) "} 
        ${idu ? " and id_user like @idu " : ""} `;
        const result = await connFunction.query(mysql, {
            min: moment(min).format('YYYY-MM-DD'),
            max: moment(max).format('YYYY-MM-DD'),
            idu
        });
        return result;
    }
};

module.exports = Feedback;