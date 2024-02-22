const connFunction = require('../utils/executeMySql');

const User = {
    login: async ({ email }) => {
        const mysql = `
        select id, password, name, surname, email, tel, prof_img, course_study
        from user 
        where email like @email and status=1`;
        const result = await connFunction.query(mysql, { email });
        return result;
    }
}

module.exports = User;