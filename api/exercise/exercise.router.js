const router = require('express').Router();
var exerciseContoller =  require('./exercise.controller');
router.post('/create',exerciseContoller.createExercise);
router.get('/:id',exerciseContoller.getExerciseById);
router.get("/workout/:id",exerciseContoller.fetchExercisesByWorkout);

exports = module.exports = router;
