const User = require('../../models/user.model');
const asyncHandler = require('express-async-handler');

//@desc Cambio password utente
//@route PUT /api/change-password/:idu
//@access private
const changePassword = asyncHandler(async (req, res) => {
    console.log(req.params, req.query)
    // const hashedPassword = hash(req.params);
    // req.body.password = hashedPassword;

    // const result = await User.changePassword({ idu: req.user.idu, password: hashedPassword });
    // if (result.affectedRows != 1) {
    //     res.status(500);
    //     throw new Error("Errore inaspettato");
    // }

    res.status(200).send({ message: "Password cambiata" });
});

module.exports = { changePassword };