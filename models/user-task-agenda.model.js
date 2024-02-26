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
};

module.exports = UserTaskAgenda;