const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "goal";

const Goal = {
    selectAllGoals: async ({ alsoFinished, idu }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, expected_grade, grade, finished, color
            FROM ${TABLE} g
            INNER JOIN user_goal ug ON ug.id_goal = g.id
            WHERE ${alsoFinished ? " 1=1 " : " finished = 0"} AND ug.id_user=@idu`;
        const result = await connFunction.query(mysql, { idu });
        return result;
    },
    createGoal: async ({
        name,
        desc,
        expiry_date,
        planned_minutes,
        minutes,
        expected_grade,
        grade,
        color
    }) => {
        const result = await connFunction.insert(TABLE, {
            name,
            "`desc`": desc,
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"),
            planned_minutes,
            minutes,
            expected_grade,
            grade,
            color
        });
        return result;
    },
    selectGoal: async ({ id, alsoFinished }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, expected_grade, grade, finished, color
            FROM ${TABLE}
            WHERE ${alsoFinished ? " 1=1 " : " finished = 0 "} AND id=@id`;
        const result = await connFunction.query(mysql, { id });
        return result;
    },
    updateGoal: async ({
        name,
        desc,
        expiry_date,
        planned_minutes,
        minutes,
        expected_grade,
        grade,
        id,
        color
    }) => {
        const result = await connFunction.update(TABLE, {
            name,
            "`desc`": desc,
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"),
            planned_minutes,
            minutes,
            expected_grade,
            grade,
            color
        },
            "id=@id",
            { id });
        return result;
    },
    updateFinished: async ({
        finished,
        id
    }) => {
        const result = await connFunction.update(TABLE, {
            finished
        },
            "id=@id",
            { id });
        return result;
    },
    updateMinutes: async ({
        id_goal
    }) => {
        const mysql = `
        UPDATE goal g
        SET minutes = (
            select sum(t.minutes)
            from task t 
            where t.id_goal = @id_goal)
        WHERE g.id = @id_goal;`;
        const result = await connFunction.query(mysql, { id_goal });
        return result;
    },
    deleteGoal: async ({
        id
    }) => {
        const result = await connFunction.delete(TABLE, "id=@id", { id });
        return result;
    },
    adminGoal: async ({ id }) => {
        const mysql = `
        select ug.id_user as idu
        from goal g
        inner join user_goal ug on ug.id_goal = g.id
        where g.id=@id and g.active = '1';`;
        const result = await connFunction.query(mysql, { id });
        return result;
    }
}

module.exports = Goal;