const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "goal";

const Goal = {
    selectAllGoals: async ({ alsoFinished }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, expected_grade, grade, finished
            FROM ${TABLE}
            WHERE ${alsoFinished ? " 1=1 " : " finished = 0 "}`;
        const result = await connFunction.query(mysql);
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
    }) => {
        const result = await connFunction.insert(TABLE, {
            name, 
            "`desc`": desc, 
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"), 
            planned_minutes, 
            minutes, 
            expected_grade,
            grade
        });
        return result;
    },
    selectGoal: async ({ id, alsoFinished }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, expected_grade, grade, finished
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
        id
    }) => {
        const result = await connFunction.update(TABLE, {
            name, 
            "`desc`": desc, 
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"), 
            planned_minutes, 
            minutes, 
            expected_grade,
            grade
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
    addMinutes: async ({
        minutes,
        id
    }) => {
        const mysql = `UPDATE ${TABLE} g
                        SET 
                            minutes = (SELECT IFNULL(minutes, 0) WHERE id=@id) + @minutes
                        WHERE id=@id;`;
        const result = await connFunction.query(mysql, { id, minutes, id });
        return result;
    },
    deleteGoal: async ({
        id
    }) => {
        const result = await connFunction.delete(TABLE, "id=@id", { id });
        return result;
    },
}

module.exports = Goal;