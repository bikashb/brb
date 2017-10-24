var router = require('express').Router();
router.use('/signin', require('./api/signin/signin.router'));
router.use('/signup', require('./api/signup/signup.router'));
router.use('/exercise',require('./api/exercise/exercise.router'));
router.use('/plan',require('./api/plan/plan.router'));
router.use('/workout',require('./api/workout/workout.router'));
router.use('/video',require('./api/videoservice/video.router'));
router.use('/subscribe',require('./api/subscribe/subscription.router'));
router.use('/userdetails',require('./api/userdetails/userdetails.router'));
router.use('/validateemail', require('./api/validateemail/validateemail.router'));
router.use('/confirmaccount', require('./api/confirmaccount/confirmaccount.router'));
router.use('/forgetpassword', require('./api/forgetpassword/forgetpassword.router'));
router.use('/updatepassword', require('./api/updatepassword/updatepassword.router'));
router.use('/fileupload', require('./api/fileupload/fileUpload.router'));
router.use('/entireplan',require('./api/planDetails/plan.router'));

exports = module.exports = router;
