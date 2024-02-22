const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');

//@desc registrare un utente
//@route POST /api/user/getActiveUsers
//@access private
const getActiveUsers = asyncHandler(async (req, res) => {
    const objUser = await User.getActiveUsers();

    console.log(objUser);

    if (objUser.length == 0){
        res.status(404);
        throw new Error();
    } 

    res.status(200).send(objUser);
});

module.exports = { getActiveUsers };