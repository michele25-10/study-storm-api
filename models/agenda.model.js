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
    }
};

module.exports = Agenda;