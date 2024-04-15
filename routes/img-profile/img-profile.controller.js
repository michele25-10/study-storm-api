const asyncHandler = require('express-async-handler');
const ImgProfile = require('../../models/img-profile.model');

//@desc API get della lista delle immagini profilo 
//@route GET /api/img-profile/
//@access private
const getListImgProfile = asyncHandler(async (req, res) => {
    const response = await ImgProfile.selectImgProfile();

    res.status(200).send(response);
});

module.exports = { getListImgProfile };
