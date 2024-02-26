const asyncHandler = require('express-async-handler');
const StudentType = require('../../models/student-type.model');

//@desc get di tutti i tipi
//@route GET /api/student-type/
//@access private
const getAllTypes = asyncHandler(async (req, res) => {
    const result = await StudentType.selectAllTypes();

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc get di un tipo dato l'id
//@route GET /api/student-type/getType
//@access private
const getType = asyncHandler(async (req, res) => {
    const result = await StudentType.selectType({ id: req.query.id });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc crea un tipo
//@route POST /api/student-type/createType
//@access private
// const createType = asyncHandler(async (req, res) => {
//     const result = await StudentType.createType({ name: req.body.name });

//     if (result.affectedRows != 1){
//         res.status(400);
//         throw new Error();
//     }

//     res.status(201).send({message: "Tipo creato"});
// });

//@desc modifica un tipo
//@route PUT /api/student-type/updateType
//@access private
// const updateType = asyncHandler(async (req, res) => {
//     const result = await StudentType.updateType({ name: req.body.name, id: req.body.id });

//     if (result.affectedRows != 1){
//         res.status(400);
//         throw new Error();
//     }

//     res.status(201).send({message: "Tipo modificato"});
// });

module.exports = { getAllTypes, getType, /* createType, updateType */ };