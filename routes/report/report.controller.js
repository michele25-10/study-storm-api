const asyncHandler = require('express-async-handler');
const Report = require('../../models/report.model');
const ReportQuestion = require('../../models/report-question.model');
const ReportAnswer = require('../../models/report-answer.model');

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

//@desc API segnalazione di una domanda o di una question da parte di un utente
//@route POST /api/report/user/:id
//@access private
const addReportUser = asyncHandler(async (req, res) => {
    const question = req.body.question;
    if (question) {
        //Faccio le api ed i controlli sulla tabella report_question

    } else {
        //Faccio le api ed i controlli sulla tabella report_answer
    }

    res.status(200).send("");
});




module.exports = { getAllReport, getSingleReport, addReportUser }; 