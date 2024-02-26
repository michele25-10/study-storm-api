const connFunction = require('../utils/executeMySql');

const TABLE = "report_answer";

const ReportAnswer = {
    selectReportAnswer: async ({ idu, id_answer }) => {
        const mysql = `select id_user, id_report, id_answer from report_answer where id_answer=@id_answer ${idu ? " and id_user=@idu " : ""}`;
        const result = await connFunction.query(mysql, { idu, id_answer });
        return result;
    },
    insertReportAnswer: async ({ idu, id_answer, id_report }) => {
        const result = await connFunction.insert(TABLE, { id_user: idu, id_answer, id_report });
        return result;
    }
};

module.exports = ReportAnswer;