const express = require('express');
const router = express.Router();

const agendaController = require('./agenda.controller');
const agendaValidation = require('./agenda.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(agendaValidation.addAgenda), agendaController.addAgenda);


module.exports = router;