const moment = require('moment/moment');
const connFunction = require('../utils/executeMySql');

const TABLE = "task";

const Task = {
    selectAllTasks: async ({ id_goal, finished }) => {
        const mysql = `
            SELECT t.id, t.name, t.minutes, t.id_goal
            FROM ${TABLE} t
            WHERE 1=1 ${id_goal ? ` AND t.id_goal=@id_goal ${finished ? " AND finished=1 " : ""} ` : ""}`;
        const result = await connFunction.query(mysql, { id_goal });
        return result;
    },
    createTask: async ({
        name,
        minutes,
        id_goal,
    }) => {
        const result = await connFunction.insert(TABLE, {
            name,
            minutes,
            id_goal,
        });
        return result;
    },
    selectTask: async ({ id, user_idu }) => {
        const mysql = `
            SELECT t.id, t.name, t.minutes, t.id_goal
            FROM ${TABLE} t
            INNER JOIN user_goal ug ON ug.id_goal = t.id_goal
            WHERE t.id=@id AND ug.id_user=@user_idu`;
        const result = await connFunction.query(mysql, { id, user_idu });
        return result;
    },
    updateTask: async ({
        name,
        id,
    }) => {
        const result = await connFunction.update(TABLE, {
            name,
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
    },
    finishedTask: async ({
        finished,
        id,
    }) => {
        const result = await connFunction.update(TABLE, {
            finished: finished ? 1 : 0,
        },
            "id=@id",
            { id });
        return result;
    },
}

module.exports = Task;