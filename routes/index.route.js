const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

router.use("/auth", require("./auth/auth.route"));
router.use("/reset-password", require("./reset-password/reset-password.route"));
router.use("/change-password", require("./change-password/change-password.route"));
router.use("/invite-team", require("./invite-team/invite-team.route"));
router.use("/newsletter", require("./newsletter/newsletter.route"));
router.use("/img-profile", require("./img-profile/img-profile.route"));
router.use("/student-type", require("./student-type/student-type.route"));
router.use("/crash", require("./crash/crash.route"));

//Rotte con token
router.all('*', validateToken);
router.use("/user", require("./user/user.route"));
router.use("/goal", require("./goal/goal.route"));
router.use("/question", require("./question/question.route"));
router.use("/user-goal", require("./user-goal/user-goal.route"));
router.use("/task", require("./task/task.route"));
router.use("/report", require("./report/report.route"));
router.use("/answer", require("./answer/answer.route"));
router.use("/feedback", require("./feedback/feedback.route"));
router.use("/agenda", require("./agenda/agenda.route"));
router.use("/stats", require("./stats/stats.route"));
router.use("/palette-color", require("./palette-color/palette-color.route"));

module.exports = router;