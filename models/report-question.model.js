const connFunction = require('../utils/executeMySql');

const TABLE = "report_question";

const ReportQuestion = {
    selectReportQuestion: async ({ idu, id_question }) => {
        const mysql = `select id_user, id_report, id_question from report_question where id_question=@id_question ${idu ? " and id_user=@idu " : ""}`;
        const result = await connFunction.query(mysql, { idu, id_question });
        return result;
    },
    insertReportQuestion: async ({ idu, id_question, id_report }) => {
        const result = await connFunction.insert(TABLE, { id_user: idu, id_question, id_report });
        return result;
    }
};

module.exports = ReportQuestion;