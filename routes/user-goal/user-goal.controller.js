const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user-goal.model');
const Goal = require('../../models/goal.model');
const InviteTeam = require('../../models/invite-team.model');
const sendMailer = require('../../utils/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path')

//@desc get di tutti le associazioni utente-obiettivo
//@route GET /api/user-goal/
//@access private
// const getAllUserGoal = asyncHandler(async (req, res) => {
//     const result = await UserGoal.selectAllUserGoal();

//     if (result.length == 0) {
//         res.status(404);
//         throw new Error();
//     }

//     res.status(200).send(result);
// });

//@desc creazione di un'associazione utente-obiettivo
//@route POST /api/user-goal
//@access private
const createUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.createUserGoal({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(201).send({ message: "Gruppo creato" });
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route PUT /api/user-goal/
//@access private
const updateAdmin = asyncHandler(async (req, res) => {
    const result = await UserGoal.updateAdmin({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Admin aggiornato" });
});

//@desc ottiene l'associazione in base all'obiettivio e all'utente
//@route DELETE /api/user-goal/
//@access private
const deleteUserGoal = asyncHandler(async (req, res) => {
    const result = await UserGoal.deleteUserGoal({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Eliminato" });
});

//@desc invito alla collaborazione di un obiettivo
//@route POST /api/user-goal/:id
//@access private
const invite = asyncHandler(async (req, res) => {
    const goal = await Goal.selectGoal({id: req.params.id});
    req.body.users.forEach(async entry => {
        const result = await UserGoal.invite({ id_user: entry.idu, id_goal: req.params.id });

        if (result.affectedRows != 1) {
            res.status(500);
            throw new Error();
        }

        const invite = await InviteTeam.selectInvite({id: result.insertId });
        if (invite.length != 1) {
            res.status(404);
            throw new Error();
        }

        const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../../templates/invite.html")).toString());
        const replacements = {
            user: req.user.email,
            goal: goal[0].name,
            verification_key: invite[0].verification_key
        };

        await sendMailer({
            from: process.env.MAIL,
            to: entry.email,
            subject: "INVITO CONDIVISIONE STUDENTIME",
            text: "",
            html: template(replacements)
        });
    });

    res.status(201).send({ message: "Invito/i inviato" });
});

//@desc ottiene l'associazione in base all'obiettivio
//@route GET /api/user-goal/filter
//@access private
// const filter = asyncHandler(async (req, res) => {
//     const result = await UserGoal.filter({ id_goal: req.query.id_goal || false, id_user: req.query.id_user || false });

//     if (result.length == 0) {
//         res.status(404);
//         throw new Error();
//     }

//     res.status(200).send(result);
// });

module.exports = { /* getAllUserGoal, */ createUserGoal, updateAdmin, deleteUserGoal, invite, /* filter */ };