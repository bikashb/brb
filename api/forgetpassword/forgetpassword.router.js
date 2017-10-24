var forgetpasswordController = require('./forgetpassword.controller');
const router = require('express').Router();
router.post("/",forgetpasswordController.forgetpassword);
router.get("/reset/:token",forgetpasswordController.resetpasswordEmail);

exports = module.exports = router;
