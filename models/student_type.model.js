const connFunction = require('../utils/executeMySql');
const moment = require('moment/moment');

const TABLE = "student_type";

const StudentType = {
    selectAllTypes: async () => {
        const mysql = `
            SELECT id, name
            FROM ${TABLE}
            WHERE 1=1`;
        const result = await connFunction.query(mysql);
        return result;
    },
    selectType: async ({ id }) => {
        const mysql = `
            SELECT id, name
            FROM ${TABLE}
            WHERE id=@id`;
        const result = await connFunction.query(mysql, { id });
        return result;
    },

    createType: async ({ name }) => {
        const result = await connFunction.insert(TABLE, { name });
        return result;
    },
}

module.exports = StudentType;