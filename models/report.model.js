const connFunction = require('../utils/executeMySql');

const TABLE = "report";

const Report = {
    selectReport: async ({ id }) => {
        const mysql = `select id, title from report where ${id ? " id=@id " : " 1=1 "}`;
        const result = await connFunction.query(mysql, { id });
        return result;
    }
};

module.exports = Report;