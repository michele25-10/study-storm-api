const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user-goal.model');
const InviteTeam = require('../../models/invite-team.model');

//@desc verifica invito
//@route GET /api/invite-team/
//@access private
const verifyInvite = asyncHandler(async (req, res) => {
    const invitation = await InviteTeam.selectInvite({ id: false, verification_key: req.query.verification_key });
    if (invitation.length != 1){
        res.status(404);
        throw new Error();
    }

    if (parseInt(invitation[0].verified) == 1){
        res.status(500);
        throw new Error();
    }   

    const result = await InviteTeam.verifyInvite({ verification_key: req.query.verification_key });

    if (result.affectedRows != 1){
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Invito Accettato" });
});

module.exports = {
    verifyInvite,
}