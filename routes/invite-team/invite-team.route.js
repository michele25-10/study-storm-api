const express = require('express');
const router = express.Router();

const inviteTeamController = require('./invite-team.controller');
const inviteTeamValidation = require('./invite-team.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(inviteTeamValidation.verifyInvite), inviteTeamController.verifyInvite);

module.exports = router;