const express = require('express');
const router = express.Router();

const paletteColorController = require('./palette-color.controller');
//const paletteColorValidation = require('./palette-color.validation');
//const validate = require('../../middleware/JoiValidation');

router.get("/", paletteColorController.getAllPalette);

module.exports = router;