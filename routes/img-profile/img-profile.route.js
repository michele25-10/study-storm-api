const express = require('express');
const router = express.Router();

const imgProfileController = require('./img-profile.controller');
//const paletteColorValidation = require('./palette-color.validation');
//const validate = require('../../middleware/JoiValidation');

router.get("/", imgProfileController.getListImgProfile);

module.exports = router;