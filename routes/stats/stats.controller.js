const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Stats = require("../../models/stats.model");
const { convertDaySql, convertMonthSql } = require('../../utils/mySqlDate');

//@desc get di tutti gli obiettivi
//@route PUT /api/stats/study/:idu
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

module.exports = { getStatsHourStudy }; 
