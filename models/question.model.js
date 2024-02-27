const connFunction = require('../utils/executeMySql');
const moment = require('moment/moment');

const TABLE = "question";

const Question = {
    insertQuestion: async ({ desc, title, idu }) => {
        const result = await connFunction.insert(TABLE, {
            "`desc`": desc,
            title,
            id_user: idu,
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
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
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
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
    },
    selectFeed: async ({ max, min, ist, limit }) => {
        const mysql = `
        select q.id, q.\`desc\`, q.title, u.name, u.surname, q.\`datetime\`, count(rq.id_question), u.id_student_type, u.course_study
        from question q 
        inner join \`user\` u on u.id like q.id_user 
        left join report_question rq on rq.id_question = q.id
        ${max && min ? `where q.\`datetime\` between @min and @max` : ""}
        ${ist ? (!max && !min ? " where u.id_student_type=@ist " : " and u.id_student_type=@ist ") : ""}
        group by q.id 
        having count(rq.id_question) < 3
        order by q.\`datetime\` asc
        ${limit ? `limit @limit` : ""}`;
        const result = await connFunction.query(mysql, {
            max: max ? moment(max).format('YYYY-MM-DD HH:mm:ss') : null,
            min: min ? moment(min).format('YYYY-MM-DD HH:mm:ss') : null,
            ist,
            limit
        });
        return result;
    },
    selectAnswerQuestion: async ({ id }) => {
        const mysql = `
        select a.id, u.name, u.surname, a.desc, a.\`datetime\`
        from answer a 
        inner join \`user\` u ON u.id like a.id_user 
        left join report_answer ra on ra.id_answer = a.id 
        where id_question = @id
        group by a.id
        having count(ra.id_answer) < 3;`;
        const result = await connFunction.query(mysql, { id });
        return result;
    }
};

module.exports = Question;