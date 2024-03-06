const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

router.use("/auth", require("./auth/auth.route"));
router.use("/reset-password", require("./reset-password/reset-password.route"));

//Rotte con token
router.all('*', validateToken);
router.use("/user", require("./user/user.route"));
router.use("/student-type", require("./student-type/student-type.route"));
router.use("/goal", require("./goal/goal.route"));
router.use("/question", require("./question/question.route"));
router.use("/user-goal", require("./user-goal/user-goal.route"));
router.use("/task", require("./task/task.route"));
router.use("/report", require("./report/report.route"));
router.use("/answer", require("./answer/answer.route"));
router.use("/feedback", require("./feedback/feedback.route"));
router.use("/agenda", require("./agenda/agenda.route"));

module.exports = router;