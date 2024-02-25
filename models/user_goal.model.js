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
            SELECT id_user, id_goal, admin, u.name, u.surname
            FROM ${TABLE} ug
            INNER JOIN user u ON u.id = ug.id_user
            WHERE  id_goal=@id_goal`;
        const result = await connFunction.query(mysql, { id_goal });
        return result;
    },
    selectUserGoalByUser: async ({ id_user }) => {
        const mysql = `
            SELECT id_user, id_goal, admin, g.name, g.\`desc\`, g.expiry_date, g.planned_minutes, g.minutes, g.expected_grade, g.grade
            FROM ${TABLE} ug
            INNER JOIN goal g ON g.id = ug.id_goal
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