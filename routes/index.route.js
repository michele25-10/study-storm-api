const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

router.use("/auth", require("./auth/auth.route"));

router.all('*', validateToken);
router.use("/user", require("./user/user.route"));
router.use("/student_type", require("./student_type/student_type.route"));
router.use("/goal", require("./goal/goal.route"));

module.exports = router;