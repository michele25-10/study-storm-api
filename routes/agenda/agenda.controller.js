
const asyncHandler = require('express-async-handler');
const Agenda = require('../../models/agenda.model');
const UserTaskAgenda = require('../../models/user-task-agenda.model');

//@desc API inserimento agenda di una task da parte di un utente
//@route POST /api/feedback/
//@access private
const addAgenda = asyncHandler(async (req, res) => {
    const check = await Agenda.isExistedAgenda({ idu: req.user.idu, id_task: req.body.id_task, date: req.body.date });
    if (check.length != 0) {
        res.status(200).send({ message: "Agenda già esistente" });
        return;
    }

    let result = await Agenda.insertAgenda({
        date: req.body.date,
        note: req.body.note,
        minutes: req.body.minutes,
    });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    const idAgenda = result.insertId;

    result = await UserTaskAgenda.insertUserTaskAgenda({ idu: req.user.idu, id_task: req.body.id_task, id_agenda: idAgenda })

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }
    res.status(201).send({ message: "Agenda inserita con successo!" });
});



module.exports = { addAgenda };