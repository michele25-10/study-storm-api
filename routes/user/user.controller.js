const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');

//@desc get di tutti gli utenti
//@route GET /api/user/
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.selectAllUsers({ alsoDisactive: req.query.alsoDisactive || false });

    res.status(200).send(result);
});

module.exports = { getAllUsers };