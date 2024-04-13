const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const Stats = {
    selectHourStudyInterval: async ({ idu, min, max }) => {
        const mysql = `
        SELECT round(sum(a.minutes) / 60) as tot
        from user_task_agenda uta
        inner join agenda a on a.id = uta.id_agenda and uta.id_user=@idu
        where a.date between @min and @max; 
        `;
        const result = await connFunction.query(mysql, {
            idu,
            min: moment(min).format('YYYY-MM-DD'),
            max: moment(max).format('YYYY-MM-DD')
        });
        return result;
    },
    selectHourStudyType: async ({ idu, min, max }) => {
        let mysql = "";

        mysql = `
            SELECT a.date, round(sum(a.minutes) / 60) as tot
            from user_task_agenda uta
            inner join agenda a on a.id = uta.id_agenda and uta.id_user=@idu
            where a.date between @min and @max
            group by a.date`;

        const result = await connFunction.query(mysql, {
            idu,
            min: moment(min).format('YYYY-MM-DD'),
            max: moment(max).format('YYYY-MM-DD')
        });

        return result;
    },
};

module.exports = Stats;