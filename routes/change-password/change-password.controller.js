const User = require('../../models/user.model');
const { hash } = require('../../utils/crypto');
const asyncHandler = require('express-async-handler');

//@desc Cambio password utente
//@route PUT /api/change-password/:idu
//@access private
const changePassword = asyncHandler(async (req, res) => {
    const hashedPassword = hash(req.query.newPassword);
    req.body.password = hashedPassword;

    const result = await User.changePassword({ idu: req.params.idu, password: hashedPassword });
    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send({ message: "Password cambiata" });
});

module.exports = { changePassword };