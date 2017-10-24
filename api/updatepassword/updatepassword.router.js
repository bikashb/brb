var updatepasswordController = require('./updatepassword.controller');
const router = require('express').Router();
router.post("/",updatepasswordController.updatepassword);
exports = module.exports = router;
