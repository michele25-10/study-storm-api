const asyncHandler = require('express-async-handler');
const StudentType = require('../../models/student-type.model');

//@desc get di tutti i tipi
//@route GET /api/student-type/
//@access private
const getAllTypes = asyncHandler(async (req, res) => {
    const result = await StudentType.selectAllTypes();

    if (result.length == 0) {
        res.status(404);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send(result);
});

//@desc get di un tipo dato l'id
//@route GET /api/student-type/:id
//@access private
const getType = asyncHandler(async (req, res) => {
    const result = await StudentType.selectType({ id: req.params.id });

    if (result.length == 0) {
        res.status(404);
        throw new Error("Errore inaspettato");
    }

    res.status(200).send(result);
});

module.exports = { getAllTypes, getType };