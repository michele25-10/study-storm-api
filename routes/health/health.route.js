const express = require('express');
const router = express.Router();

const healthController = require('./health.controller');
const healthValidation = require('./health.validation');
const validate = require('../../middleware/JoiValidation');

//const validateToken = require('../../middleware/validateToken');


//router.all('*', validateToken); 
/*tutte le rotte sottostanti questa riga prima di entrare nei loro controller verrà verificato se il token è valido*/

router.get("/", validate(healthValidation.healthBackendCheck), healthController.healthBackendCheck);

module.exports = router;