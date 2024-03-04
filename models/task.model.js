const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "task";

const Task = {
    selectAllTasks: async ({ id_goal }) => {
        const mysql = `
            SELECT id, name, \`desc\`, expiry_date, planned_minutes, minutes, id_goal
            FROM ${TABLE}
            WHERE 1=1 ${id_goal ? " AND id_goal=@id_goal" : ""}`;
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
    updateMinutes: async ({
        id_task
    }) => {
        const mysql = `
        UPDATE task t
	    SET minutes = (
    	    select sum(a.minutes)
    	    from agenda a
    	    inner join user_task_agenda uta on uta.id_agenda = a.id and uta.id_task=@id_task
    	    )    	
        WHERE id=@id_task;
        `;
        const result = await connFunction.query(mysql, { id_task });
        return result;
    },
    deleteTask: async ({
        id
    }) => {
        const result = await connFunction.delete(TABLE, "id=@id", { id });
        return result;
    },
    selectIdGoalByTask: async ({ id }) => {
        const mysql = "select id_goal from task where id=@id limit 1";
        const result = await connFunction.query(mysql, { id });
        return result[0].id_goal;
    }
}

module.exports = Task;