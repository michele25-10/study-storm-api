const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');

//@desc get di tutti gli utenti
//@route GET /api/user/
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.selectAllUsers({ alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc get di un utente dato l'id
//@route GET /api/user/getUser
//@access private
const getUser = asyncHandler(async (req, res) => {
    const result = await User.selectUser({ idu: req.query.idu, alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc get di un utente data la mail
//@route GET /api/user/getUserByEmail
//@access private
const getUserByEmail = asyncHandler(async (req, res) => {
    const result = await User.selectUserByEmail({ email: req.query.email, alsoDisactive: req.query.alsoDisactive || false });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc update di un utente
//@route PUT /api/user/updateUser
//@access private
const updateUser = asyncHandler(async (req, res) => {
    const result = await User.updateUser({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    res.status(200).send({message: "Utente modificato"});
});

//@desc eliminazione di un utente
//@route DELETE /api/user/deleteUser
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const result = await User.deleteUser({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    res.status(200).send({message: "Utente eliminato"});
});

module.exports = { getAllUsers, getUser, getUserByEmail, updateUser, deleteUser };