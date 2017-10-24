const router = require('express').Router();
var workoutController =  require('./workout.controller')
router.post('/createworkout',workoutController.createworkout);
//router.get('/')
exports = module.exports = router;
