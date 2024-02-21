const express = require('express');
const router = express.Router();

router.use("/health", require("./health/health.route"));

module.exports = router;