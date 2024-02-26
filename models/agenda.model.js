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
    isExistedAgenda: async ({ idu, id_task, date }) => {
        const mysql = `
        select a.id
        from user_task_agenda uta 
        inner join agenda a on a.id = uta.id_agenda
        where uta.id_user=@idu and uta.id_task=@id_task and a.date=@date`;
        const result = await connFunction.query(mysql, {
            idu,
            id_task,
            date: moment(date).format('YYYY-MM-DD'),
        });
        return result;
    }
};

module.exports = Agenda;