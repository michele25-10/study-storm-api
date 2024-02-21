const asyncHandler = require('express-async-handler');

//@desc Modifica famiglia
//@route PUT /api/user/
//@access private
const healthBackendCheck = asyncHandler(async (req, res) => {
    res.status(200).send({
        message: "Il server è in ascolto",
        port: process.env.PORT || 5001
    })
});

module.exports = { healthBackendCheck }