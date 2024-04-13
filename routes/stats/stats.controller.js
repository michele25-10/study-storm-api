const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Stats = require("../../models/stats.model");
const { convertDaySql, convertMonthSql } = require('../../utils/mySqlDate');

//@desc get di tutti gli obiettivi
//@route PUT /api/stats/study/:idu
//@access private
const getStatsHourStudy = asyncHandler(async (req, res) => {
    const response = {};

    const result = await Stats.selectHourStudyType({ idu: req.user.idu, min: req.query.min, max: req.query.max });
    console.log(result);

    if (req.query.type === "Settimana") {
        console.log(convertDaySql(result));
        response.chartData = convertDaySql(result);
    }
    else if (req.query.type === "Mese") {
        console.info("Ho superato la query");
        response.chartData = result;
        console.log(response);
    } else {
        //Anno
        console.info("Ho superato la query");
        response.chartData = convertMonthSql(result);
        console.log(response);
    }

    res.status(200).send(response);
});

module.exports = { getStatsHourStudy }; 
