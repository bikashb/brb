var signupController = require('./signup.controller');
const router = require('express').Router();
router.post("/",signupController.signup);
exports = module.exports = router;
