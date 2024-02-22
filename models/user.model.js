const connFunction = require('../utils/executeMySql');
const moment = require('moment/moment');

const TABLE = "user";

const User = {
    login: async ({ email }) => {
        const mysql = `
        select id, password, name, surname, email, tel, prof_img, course_study
        from user 
        where email like @email and status=1`;
        const result = await connFunction.query(mysql, { email });
        return result;
    },
    registration: async ({ name, surname, email, tel, password, id_student_type, course_study, birth_date, prof_img }) => {
        const result = await connFunction.insert(TABLE, { 
            name,
            surname,
            email,
            tel, 
            password,
            id_student_type,
            course_study, 
            birth_date: moment(birth_date).format("YYYY-MM-DD"),
            prof_img
         });
        return result;
    },
    getActiveUsers: async () => {
        const mysql = `
            SELECT id, password, name, surname, email, tel, prof_img, course_study
            FROM user
            WHERE status = 1`;

        const result = await connFunction.query(mysql);

        return result;
    },
}

module.exports = User;