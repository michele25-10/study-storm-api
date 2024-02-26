const express = require('express');
const router = express.Router();

const feedbackController = require('./feedback.controller');
const feedbackValidation = require('./feedback.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(feedbackValidation.addFeedback), feedbackController.addFeedback);
router.put("/:id", validate(feedbackValidation.putFeedback), feedbackController.putFeedback);
router.delete("/:id", validate(feedbackValidation.deleteFeedback), feedbackController.deleteFeedback);
router.get("/:id", validate(feedbackValidation.getSingleFeedback), feedbackController.getSingleFeedback);
router.get("/", validate(feedbackValidation.getAllFeedback), feedbackController.getAllFeedback);

module.exports = router;