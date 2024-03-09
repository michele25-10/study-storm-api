const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "invite_team";

const InviteTeam = {
    verifyInvite: async({ verification_key }) => {
        const result = await connFunction.update(TABLE, { verified: 1 }, "verification_key=@verification_key", { verification_key });
        return result;
    },
    selectInvite: async({ id }) => {
        const mysql = `SELECT * 
                       FROM ${TABLE}
                       WHERE id=@id`;
        const result = await connFunction.query(mysql, { id });
        return result;
    }
}

module.exports = InviteTeam;