const asyncHandler = require('express-async-handler');
const Report = require('../../models/report.model');

//@desc API get di tutti i tipi di report
//@route GET /api/report/
//@access private
const getAllReport = asyncHandler(async (req, res) => {
    const response = await Report.selectReport({ id: false });

    res.status(200).send(response);
});

//@desc API get di un singolo tipo di report
//@route GET /api/report/:id
//@access private
const getSingleReport = asyncHandler(async (req, res) => {
    const response = await Report.selectReport({ id: req.params.id });

    res.status(200).send(response);
});




module.exports = { getAllReport, getSingleReport }; 