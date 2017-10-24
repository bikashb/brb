var workoutController = require('./workout.controller');
const router = require('express').Router();
router.post("/create",workoutController.createWorkout);
router.get("/:id",workoutController.fetchWorkoutsById);
router.post("/plan",workoutController.fetchWorkoutsByPlan);
exports = module.exports = router;
