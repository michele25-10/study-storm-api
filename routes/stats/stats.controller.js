const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Stats = require("../../models/stats.model");

//@desc get di tutti gli obiettivi
//@route PUT /api/stats/study/:idu
//@access private
const getStatsHourStudy = asyncHandler(async (req, res) => {
    const response = {};

    if (req.query.min) {
        const min = moment(req.query.min).format('YYYY-MM-DD');
        const max = req.query.max || moment().format('YYYY-MM-DD');

        response.interval = await Stats.selectHourStudyInterval({ min, max, idu: req.params.idu })
    } else {
        response.week = await Stats.selectHourStudyType({ idu: req.params.idu, type: "week" });
        response.month = await Stats.selectHourStudyType({ idu: req.params.idu, type: "month" });
        response.year = await Stats.selectHourStudyType({ idu: req.params.idu, type: "year" });
    }

    res.status(200).send(response);
});

module.exports = { getStatsHourStudy }; 
