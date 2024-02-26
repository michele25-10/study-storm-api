const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

router.use("/auth", require("./auth/auth.route"));

router.all('*', validateToken);
router.use("/user", require("./user/user.route"));
router.use("/student_type", require("./student_type/student_type.route"));
router.use("/goal", require("./goal/goal.route"));
router.use("/question", require("./question/question.route"));
router.use("/user_goal", require("./user_goal/user_goal.route"));
router.use("/task", require("./task/task.route"));
router.use("/report", require("./report/report.route"));

module.exports = router;