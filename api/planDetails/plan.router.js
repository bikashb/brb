var planController = require('./plan.controller');
const router = require('express').Router();
router.get("/:id",planController.fetchPlansById);
exports = module.exports = router;
