const asyncHandler = require('express-async-handler');
const StudentType = require('../../models/student_type.model');

//@desc get di tutti i tipi
//@route POST /api/student_type/
//@access private
const getAllTypes = asyncHandler(async (req, res) => {
    const result = await StudentType.selectAllTypes();

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
})

//@desc get di un tipo dato l'id
//@route POST /api/student_type/getType
//@access private
const getType = asyncHandler(async (req, res) => {
    const result = await StudentType.selectType({ id: req.query.id });

    if (result.length == 0){
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
})

module.exports = { getAllTypes, getType };