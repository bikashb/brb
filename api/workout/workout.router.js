var workoutController = require('./workout.controller');
const router = require('express').Router();
router.post("/create",workoutController.createWorkout);
router.put("/update",workoutController.editWorkout);
router.get("/:id",workoutController.fetchWorkoutsById);
router.post("/plan",workoutController.fetchWorkoutsByPlan);
router.delete('/delete/:id',workoutController.deleteworkout);
exports = module.exports = router;
