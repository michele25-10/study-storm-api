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
    selectHourStudyType: async ({ idu, min, max, type }) => {
        let mysql = "";
        if (type == "Anno") {
            mysql = `
            SELECT MONTH(a.date) as month, round(sum(a.minutes) / 60) as tot
            from user_task_agenda uta
            inner join agenda a on a.id = uta.id_agenda and uta.id_user=@idu
            where a.date between @min and @max
            group by MONTH(a.date)
            order by MONTH(a.date) asc`;
        } else {
            mysql = `
            SELECT a.date, round(sum(a.minutes) / 60) as tot
            from user_task_agenda uta
            inner join agenda a on a.id = uta.id_agenda and uta.id_user=@idu
            where a.date between @min and @max
            group by a.date
            order by a.date asc`;
        }

        const result = await connFunction.query(mysql, {
            idu,
            min: moment(min).format('YYYY-MM-DD'),
            max: moment(max).format('YYYY-MM-DD')
        });

        return result;
    },
    selectLastTotDaysStats: async ({ idu, numberOfDays }) => {
        const mysql = `
        SELECT g.id, g.name, ROUND(SUM(a.minutes) / 60) AS value, pc.primary_color, pc.secondary_color
        FROM user_task_agenda uta
        INNER JOIN agenda a ON a.id = uta.id_agenda
        INNER JOIN task t ON t.id = uta.id_task
        INNER JOIN goal g ON g.id = t.id_goal
        INNER JOIN palette_color pc ON pc.id = g.id_palette
        WHERE uta.id_user = @idu
            AND a.\`date\` BETWEEN DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY) AND CURDATE()
        GROUP BY g.id, g.name;`;

        const result = await connFunction.query(mysql, {
            idu
        });
        return result;
    },
    selectInfoStudy: async ({ idu, numberOfDays }) => {
        const mysql = `
        SELECT uta.id_user as idu, ROUND(sum(a.minutes) / 7) AS avg, count(a.id) AS frequency, 
        (
           SELECT ROUND(sum(a2.minutes) / 7)
           FROM user_task_agenda uta2
           INNER JOIN agenda a2 ON a2.id = uta2.id_agenda
           INNER JOIN task t2 ON t2.id = uta2.id_task
           WHERE uta2.id_user = @idu
             AND a2.\`date\` BETWEEN DATE_SUB(CURDATE(), INTERVAL ${numberOfDays * 2} DAY) 
                            AND DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY)
          group by uta2.id_user
       ) AS last_avg
        FROM user_task_agenda uta
        INNER JOIN agenda a ON a.id = uta.id_agenda
        INNER JOIN task t ON t.id = uta.id_task
        WHERE uta.id_user = @idu
            AND a.\`date\` BETWEEN DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY) AND CURDATE()
        GROUP BY uta.id_user;`;

        const result = await connFunction.query(mysql, {
            idu
        });

        return result;
    },
    selectInfoStudyHistory: async ({ idu, id_goal }) => {
        const mysql = `
                SELECT SUM(a.minutes) / 60 as 'tot', MONTH(a.date) as 'month', YEAR(a.date) as 'year'
                FROM task tk
                INNER JOIN user_task_agenda uta ON uta.id_task = tk.id
                INNER JOIN agenda a ON a.id = uta.id_agenda
                WHERE tk.id_goal = @id_goal AND uta.id_user = @idu
                GROUP BY MONTH(a.date), YEAR(a.date)
            `;

        const result = await connFunction.query(mysql, {
            id_goal,
            idu
        });

        return result;
    },
    selectGradeGoal: async ({ idu }) => {
        const mysql = `
                SELECT g.name, g.grade as 'value', pc.primary_color, pc.secondary_color
                FROM  user_goal ug 
                inner join goal g on g.id=ug.id_goal and g.grade IS NOT NULL and g.finished = '1'
                inner join palette_color pc on pc.id=g.id_palette 
                where ug.id_user like @idu
	                and g.expiry_date BETWEEN  DATE_SUB(NOW(), INTERVAL 365 DAY) AND NOW() 
                ORDER BY g.expiry_date DESC; 
            `;

        const result = await connFunction.query(mysql, {
            idu
        });

        return result;
    },
};

module.exports = Stats;