const connFunction = require('../utils/executeMySql');

const TABLE = "user_goal";

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
    selectUserGoalByGoal: async ({ id_goal }) => {
        const mysql = `
            SELECT id_user, id_goal, admin
            FROM ${TABLE}
            WHERE  id_goal=@id_goal`;
        const result = await connFunction.query(mysql, { id_goal });
        return result;
    },
    selectUserGoalByUser: async ({ id_user }) => {
        const mysql = `
            SELECT id_user, id_goal, admin
            FROM ${TABLE}
            WHERE  id_user=@id_user`;
        const result = await connFunction.query(mysql, { id_user });
        return result;
    },
    selectUserGoal: async ({ id_user, id_goal }) => {
        const mysql = `
            SELECT id_user, id_goal, admin
            FROM ${TABLE}
            WHERE  id_user=@id_user AND id_goal=@id_goal`;
        const result = await connFunction.query(mysql, { id_user, id_goal });
        return result;
    },
    updateAdmin: async ({ id_user, id_goal, admin }) => {
        const result = await connFunction.update(TABLE, { admin }, "id_goal=@id_goal AND id_user=@id_user", { id_goal, id_user });
        return result;
    },
}

module.exports = UserGoal;