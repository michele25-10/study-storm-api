const asyncHandler = require('express-async-handler');
const Report = require('../../models/report.model');
const { jaccardSimilarity } = require('../../utils/isSimilString');

//@desc API get di tutti i tipi di report
//@route GET /api/report/
//@access private
const getAllReport = asyncHandler(async (req, res) => {
    const response = await Report.selectAllReport({ ...req.body, idu: req.user.idu });

    res.status(200).send(response);
});



module.exports = { getAllReport }; 