const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "task";

const Task = {
    selectAllTasks: async () => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, id_goal
            FROM ${TABLE}
            WHERE 1=1`;
        const result = await connFunction.query(mysql);
        return result;
    },
    createTask: async ({
        name, 
        desc, 
        expiry_date, 
        planned_minutes, 
        minutes, 
        id_goal
    }) => {
        const result = await connFunction.insert(TABLE, {
            name, 
            "`desc`": desc, 
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"), 
            planned_minutes, 
            minutes, 
            id_goal
        });
        return result;
    },
    selectTask: async ({ id }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes
            FROM ${TABLE}
            WHERE id=@id`;
        const result = await connFunction.query(mysql, { id });
        return result;
    },
    updateTask: async ({
        name, 
        desc, 
        expiry_date, 
        planned_minutes, 
        minutes, 
        id
    }) => {
        const result = await connFunction.update(TABLE, {
            name, 
            "`desc`": desc, 
            expiry_date: moment(expiry_date).format("YYYY-MM-DD"), 
            planned_minutes, 
            minutes, 
        },
        "id=@id",
        { id });
        return result;
    },
}

module.exports = Task;