const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "goal";

const Goal = {
    selectAllGoals: async ({ alsoFinished, idu }) => {
        const mysql = `
            SELECT g.id, g.name, g.\`desc\`, g.expiry_date, g.planned_minutes, g.minutes, g.expected_grade, g.grade, g.finished, pc.primary_color, pc.secondary_color
            FROM ${TABLE} g
            inner join palette_color pc on pc.id = g.id_palette
            INNER JOIN user_goal ug ON ug.id_goal = g.id
            WHERE ${alsoFinished ? " ug.id_user LIKE @idu " : " (g.finished = 0 OR expiry_date > now()) AND ug.id_user LIKE @idu "}`;
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
        id_palette
    }) => {
        const result = await connFunction.insert(TABLE, {
            name,
            "`desc`": desc,
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"),
            planned_minutes,
            minutes,
            expected_grade,
            grade,
            id_palette: id_palette ? id_palette : 1,
        });
        return result;
    },
    selectGoal: async ({ id, alsoFinished }) => {
        const mysql = `
            SELECT g.id, g.name, g.\`desc\`, g.expiry_date, g.planned_minutes, g.minutes, g.expected_grade, g.grade, g.finished, g.id_palette, pc.primary_color, pc.secondary_color
            FROM ${TABLE} g
            inner join palette_color pc on pc.id = g.id_palette
            WHERE ${alsoFinished ? " 1=1 " : " g.finished = 0 "} AND g.id=@id`;
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
        id_palette,
    }) => {
        const result = await connFunction.update(TABLE, {
            name,
            "`desc`": desc,
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"),
            planned_minutes,
            minutes,
            expected_grade,
            grade,
            id_palette: id_palette ? id_palette : 1
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