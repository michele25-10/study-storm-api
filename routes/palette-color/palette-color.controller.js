const asyncHandler = require('express-async-handler');
const PaletteColor = require('../../models/palette-color.model');

//@desc API get delle palette 
//@route GET /api/palette-color/
//@access private
const getAllPalette = asyncHandler(async (req, res) => {
    const response = await PaletteColor.selectAllPalette();

    res.status(200).send(response);
});

module.exports = { getAllPalette };
