const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "reset_password";

const ResetPassword = {
    insertResetPassword: async ({ idu }) => {
        const result = await connFunction.insert(TABLE, {
            id_user: idu,
            date_created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        return result;
    },
    checkResetPassword: async ({ idu }) => {
        const mysql = `
        select rp.id
        from reset_password rp 
        inner join user u on u.id = rp.id_user
        where rp.date_created >= NOW() - INTERVAL 1 DAY and rp.id_user like @idu and rp.verified = '0'`;
        const result = await connFunction.query(mysql, { idu });
        return result;
    }
}

module.exports = ResetPassword;