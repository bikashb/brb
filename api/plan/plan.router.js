var planController = require('./plan.controller');
const router = require('express').Router();
router.post("/assignstudents",planController.assignStudents);
router.post("/create",planController.createPlan);
router.get("/:id",planController.fetchPlansById);
exports = module.exports = router;
