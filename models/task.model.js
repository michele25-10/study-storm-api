const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "task";

const Task = {
    selectAllTasks: async ({ id_goal }) => {
        console.log(id_goal);
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, id_goal
            FROM ${TABLE}
            WHERE 1=1 ${id_goal ? " AND id_goal=@id_goal": ""}`;
        const result = await connFunction.query(mysql, { id_goal });
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
            expiry_date: expiry_date ? moment(expiry_date).format("YYYY-MM-DD") : null,
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
    addMinutes: async ({
        minutes,
        id
    }) => {
        const mysql = `UPDATE ${TABLE} t
                        SET 
                            minutes = (SELECT IFNULL(minutes, 0) WHERE id=@id) + @minutes
                        WHERE id=@id;`;
        const result = await connFunction.query(mysql, { id, minutes, id });
        return result;
    },
    deleteTask: async ({
        id
    }) => {
        const result = await connFunction.delete(TABLE, "id=@id", { id });
        return result;
    },
}

module.exports = Task;