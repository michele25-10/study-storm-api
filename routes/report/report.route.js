const express = require('express');
const router = express.Router();

const reportController = require('./report.controller');
const reportValidation = require('./report.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", reportController.getAllReport);
router.get("/:id", validate(reportValidation.getSingleReport), reportController.getSingleReport);

//segnalazione fatta da un utente
router.post("/user/", validate(reportValidation.addReportUser), reportController.addReportUser);

module.exports = router;