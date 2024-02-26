const connFunction = require('../utils/executeMySql');
const moment = require('moment/moment');

const TABLE = "user";

const User = {
    login: async ({ email }) => {
        const mysql = `
        select id, password, name, surname, email, tel, prof_img, course_study, id_student_type
        from ${TABLE}
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
    selectAllUsers: async ({ alsoDisactive }) => {
        const mysql = `
            SELECT id, name, surname, email, tel, prof_img, course_study
            FROM ${TABLE}
            WHERE ${alsoDisactive ? " 1=1 " : " status = 1 "}`;
        const result = await connFunction.query(mysql);
        return result;
    },
    selectUser: async ({ idu, alsoDisactive }) => {
        const mysql = `
            SELECT id, name, surname, email, tel, prof_img, course_study
            FROM ${TABLE}
            WHERE ${alsoDisactive ? " 1=1 " : " status = 1 "} AND id=@idu`;
        const result = await connFunction.query(mysql, { idu });
        return result;
    },
    selectUserByEmail: async ({ email, alsoDisactive }) => {
        const mysql = `
            SELECT id, name, surname, email, tel, prof_img, course_study
            FROM ${TABLE}
            WHERE ${alsoDisactive ? " 1=1 " : " status = 1 "} AND email=@email`;
        const result = await connFunction.query(mysql, { email });
        return result;
    },
    updateUser: async ({ course_study, birth_date, tel, idu }) => {
        const result = await connFunction.update(TABLE, {
            tel,
            course_study,
            birth_date: moment(birth_date).format("YYYY-MM-DD"),
        },
            "id=@idu",
            { idu });

        return result;
    },
    deleteUser: async ({ idu }) => {
        const mysql = `
            UPDATE ${TABLE}
                SET status = 0
            WHERE id=@idu`;
        const result = await connFunction.query(mysql, { idu });
        return result;
    },
}

module.exports = User;