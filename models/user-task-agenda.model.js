const connFunction = require('../utils/executeMySql');

const TABLE = "user_task_agenda";

const UserTaskAgenda = {
    insertUserTaskAgenda: async ({ idu, id_task, id_agenda }) => {
        const result = await connFunction.insert(TABLE, {
            id_user: idu,
            id_task,
            id_agenda
        });
        return result;
    },
    selectIdTaskByAgenda: async ({ id_agenda }) => {
        const mysql = `
        select uta.id_task from user_task_agenda uta where uta.id_agenda = @id_agenda LIMIT 1`;
        const result = await connFunction.query(mysql, { id_agenda });
        return result[0].id_task;
    }
};

module.exports = UserTaskAgenda;