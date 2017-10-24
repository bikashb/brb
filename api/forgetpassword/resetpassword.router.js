var forgetpasswordController = require('./forgetpassword.controller');
const router = require('express').Router();
router.post("/",forgetpasswordController.resetpassword);
exports = module.exports = router;
