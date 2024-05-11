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
        const check = await ReportQuestion.selectReportQuestion({ idu: req.user.idu, id_question: req.body.id });
        if (check.length > 0) {
            res.status(200).send({ message: "La segnalazione è già stata fatta" });
            return;
        }

        const result = await ReportQuestion.insertReportQuestion({ idu: req.user.idu, id_question: req.body.id, id_report: req.body.id_report })
        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error("Errore inaspettato");
        }
    } else {
        //Faccio le api ed i controlli sulla tabella report_answer
        const check = await ReportAnswer.selectReportAnswer({ idu: req.user.idu, id_answer: req.body.id });
        if (check.length > 0) {
            res.status(200).send({ message: "La segnalazione è già stata fatta" });
            return;
        }

        const result = await ReportAnswer.insertReportAnswer({ idu: req.user.idu, id_answer: req.body.id, id_report: req.body.id_report })
        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error("Errore inaspettato");
        }
    }

    res.status(201).send({ message: "Segnalazione effettuata!" });
});




module.exports = { getAllReport, getSingleReport, addReportUser }; 