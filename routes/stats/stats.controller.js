const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Stats = require("../../models/stats.model");
const { convertDaySql, convertMonthSql } = require('../../utils/mySqlDate');

//@desc get di tutti gli obiettivi
//@route GET /api/stats/study/:idu
//@access private
const getStatsHourStudy = asyncHandler(async (req, res) => {
    const response = {};
    const result = await Stats.selectHourStudyType({ idu: req.user.idu, min: req.query.min, max: req.query.max, type: req.query.type });

    if (req.query.type === "Settimana") {
        console.log(convertDaySql(result));
        response.chartData = convertDaySql(result);
    }
    else if (req.query.type === "Mese") {
        console.info("Ho superato la query");
        response.chartData = [];
        for (const row of result) {
            response.chartData.push({
                tot: row.tot,
                name: moment(row.date).format("DD"),
            })
        }
        console.log(response);
    } else {
        //Anno
        response.chartData = convertMonthSql(result);
    }

    res.status(200).send(response);
});

//@desc get della divisione dello studio negli ultimi 7 giorni tra i vari obiettivi (Studio del tempo investito)
//@route GET /api/stats/study/:idu
//@access private
const getLastSevenDaysStats = asyncHandler(async (req, res) => {
    const response = await Stats.selectLastTotDaysStats({ idu: req.user.idu, numberOfDays: 7 });
    res.status(200).send(response);
});

//@desc get della divisione dello studio negli ultimi 30 giorni tra i vari obiettivi (Studio del tempo investito)
//@route GET /api/stats/study/:idu
//@access private
const getLastThirtyDaysStats = asyncHandler(async (req, res) => {
    const response = await Stats.selectLastTotDaysStats({ idu: req.user.idu, numberOfDays: 30 });

    res.status(200).send(response);
});

//@desc get delle informazioni come media ore di studio all'interno di una settimana, distribuzione di frequenza, Andamento rispetto alla settimana precedente ancora
//@route GET /api/stats/study/:idu
//@access private
const getStudyInfo = asyncHandler(async (req, res) => {
    const response = await Stats.selectInfoStudy({ idu: req.user.idu, numberOfDays: 7 });

    delete response[0].idu;
    response[0].percentuage = Math.round(((response[0].avg / response[0].last_avg) * 100) - 100);

    res.status(200).send(response[0]);
});

//@desc get delle informazioni come media ore di studio per ogni mese, distribuzione di frequenza, Andamento rispetto alla settimana precedente ancora
//@route GET /api/stats/study/info/:id
//@access private
const getStudyInfoHistory = asyncHandler(async (req, res) => {
    const response = {};
    let result = await Stats.selectInfoStudyHistory({ idu: req.user.idu, id_goal: req.params.id_goal });
    if (result.length > 0) {
        result = convertMonthSql(result);

        response.chartData = [];
        for (const row of result) {
            if (row.tot != 0) {
                response.chartData.push({
                    value: row.tot,
                    name: row.name,
                });
            }
        }
    }

    res.status(200).send(response);
});

//@desc get delle informazioni come media ore di studio per ogni mese, distribuzione di frequenza, Andamento rispetto alla settimana precedente ancora
//@route GET /api/stats/final-grade/year/:id
//@access private
const getStatsGradeYear = asyncHandler(async (req, res) => {
    let response = [];
    response = await Stats.selectGradeGoal({ idu: req.user.idu });
    for (const i in response) {
        response[i].id = i;
    }
    res.status(200).send(response);
});

module.exports = { getStatsHourStudy, getLastSevenDaysStats, getLastThirtyDaysStats, getStudyInfo, getStudyInfoHistory, getStatsGradeYear }; 
