const express = require('express');
const router = express.Router();

const agendaController = require('./agenda.controller');
const agendaValidation = require('./agenda.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(agendaValidation.addAgenda), agendaController.addAgenda);
router.put("/:id", validate(agendaValidation.putAgenda), agendaController.putAgenda);
router.delete("/:id", validate(agendaValidation.deleteAgenda), agendaController.deleteAgenda);
router.get("/:id", validate(agendaValidation.getSingleAgenda), agendaController.getSingleAgenda);
router.get("/", validate(agendaValidation.getAllAgenda), agendaController.getAllAgenda);
router.get("/calendar/personal", validate(agendaValidation.getAgendaCalendar), agendaController.getAgendaCalendar);

module.exports = router;