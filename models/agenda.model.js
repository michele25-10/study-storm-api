const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const TABLE = "agenda";

const Agenda = {
    insertAgenda: async ({ date, note, minutes }) => {
        const result = await connFunction.insert(TABLE, {
            date: moment(date).format('YYYY-MM-DD'),
            note,
            minutes
        });
        return result;
    },
    isExistedAgenda: async ({ idu, id_task, date, id_agenda }) => {
        const mysql = `
        select a.id
        from user_task_agenda uta 
        inner join agenda a on a.id = uta.id_agenda
        where uta.id_user=@idu and uta.id_task=${id_agenda ? `(
            select uta2.id_task 
            from agenda a2 
            inner join user_task_agenda uta2 on uta2.id_agenda= a2.id
            where a2.id=@id_agenda
        )` : " @id_task "} and a.date=@date`;
        const result = await connFunction.query(mysql, {
            idu,
            id_task,
            id_agenda,
            date: moment(date).format('YYYY-MM-DD'),
        });
        return result;
    },
    updateAgenda: async ({ date, note, minutes, id }) => {
        const result = await connFunction.update(TABLE, {
            date: moment(date).format('YYYY-MM-DD'),
            note,
            minutes,
        }, " id=@id ", { id });
        return result;
    },
    deleteAgenda: async ({ id }) => {
        const result = await connFunction.delete(TABLE, " id=@id ", { id });
        return result;
    },
    selectSingleAgenda: async ({ id, user }) => {
        const mysql = `
        select a.id, a.date, a.note, a.minutes, uta.id_task
        from agenda a
        inner join user_task_agenda uta on a.id = uta.id_agenda and uta.id_agenda=@id 
        where a.id=@id ${user ? " and uta.id_user = @user " : ""}`;
        const result = await connFunction.query(mysql, { id, user });
        return result;
    },
    selectAllAgenda: async ({ idu, admin, id_task, date }) => {
        const mysql = `
        select a.id, a.date, a.note, a.minutes, u.name, u.surname
        from agenda a
        inner join user_task_agenda uta on uta.id_agenda=a.id
        inner join user u on u.id = uta.id_user
        where uta.id_task=@id_task ${date ? " and a.date=@date " : ""} ${admin ? "" : " and uta.id_user=@idu"} `;
        const result = await connFunction.query(mysql, {
            idu,
            id_task,
            date: date ? moment(date).format('YYYY-MM-DD') : false
        });
        return result;
    },
    isAuthorizedUserAddAgenda: async ({ idu, id_task }) => {
        const mysql = `
        select g.id as idGoal, ug.admin, ug.id_user as idu
        from user_goal ug 
        inner join goal g on g.id = ug.id_goal 
        inner join task t on t.id_goal = g.id and t.id = @id_task
        where ug.id_user like @idu and ug.active = 1`;
        const result = await connFunction.query(mysql, { idu, id_task });
        return result;
    }
};

module.exports = Agenda;