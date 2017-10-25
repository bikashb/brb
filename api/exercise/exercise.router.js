const router = require('express').Router();
var exerciseContoller =  require('./exercise.controller');
router.post('/create',exerciseContoller.createExercise);
router.put('/update',exerciseContoller.editExercise);
router.get('/:id',exerciseContoller.getExerciseById);
router.get("/workout/:id",exerciseContoller.fetchExercisesByWorkout);
router.delete('/delete/:id', exerciseContoller.deleteexercise);
exports = module.exports = router;
