const connFunction = require('../utils/executeMySql');

const TABLE = "report";

const Report = {
    selectAllReport: async () => {
        const mysql = "select id, title from report where 1=1; "
        const result = await connFunction.query(mysql, {});
        return result;
    }
};

module.exports = Report;