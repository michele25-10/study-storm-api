const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

router.use("/auth", require("./auth/auth.route"));

router.all('*', validateToken);

module.exports = router;