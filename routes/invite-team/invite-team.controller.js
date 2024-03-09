const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user-goal.model');
const InviteTeam = require('../../models/invite-team.model');

//@desc verifica invito
//@route GET /api/invite-team/
//@access private
const verifyInvite = asyncHandler(async (req, res) => {
    const result = await InviteTeam.verifyInvite({ verification_key: req.query.verification_key });
    console.log(result);
    if (result.affectedRows != 1){
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Invito Accettato" });
});

module.exports = {
    verifyInvite,
}