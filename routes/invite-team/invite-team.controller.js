const asyncHandler = require('express-async-handler');
const UserGoal = require('../../models/user-goal.model');
const InviteTeam = require('../../models/invite-team.model');

//@desc verifica invito
//@route GET /api/invite-team/
//@access private
const verifyInvite = asyncHandler(async (req, res) => {
    console.log(req.query.verification_key);

    res.status(201).send({ message: "Invito Accettato" });
});

module.exports = {
    verifyInvite,
}