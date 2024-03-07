const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const TABLE = "user_goal";
const TEAM_TABLE = "invite_team"

const UserGoal = {
    selectAllUserGoal: async () => {
        const mysql = `
            SELECT id_user, id_goal, admin
            FROM ${TABLE}
            WHERE  1=1`;
        const result = await connFunction.query(mysql);
        return result;
    },
    createUserGoal: async ({
        id_user,
        id_goal,
        admin
    }) => {
        const result = await connFunction.insert(TABLE, {
            id_user,
            id_goal,
            admin
        });
        return result;
    },
    filter: async ({ id_user, id_goal }) => {
        const mysql = `
            SELECT id_user, id_goal, admin
            FROM ${TABLE}
            WHERE ${id_user ? " id_user LIKE @id_user " : " 1=1 "} AND ${id_goal ? " id_goal=@id_goal " : "1=1"}`;
        const result = await connFunction.query(mysql, { id_user, id_goal });
        return result;
    },
    updateAdmin: async ({ id_user, id_goal, admin }) => {
        const result = await connFunction.update(TABLE, { admin }, "id_goal=@id_goal AND id_user=@id_user", { id_goal, id_user });
        return result;
    },
    deleteUserGoal: async ({ id_user, id_goal }) => {
        const result = await connFunction.delete(TABLE, "id_goal=@id_goal AND id_user=@id_user", { id_goal, id_user });
        return result;
    },
    invite: async ({ id_user, id_goal }) => {
        const result = await connFunction.insert(TEAM_TABLE, { 
            id_user,
            id_goal,
            date_created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
         });
         return result;
    }
}

module.exports = UserGoal;