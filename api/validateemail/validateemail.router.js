var validateemailController = require('./validateemail.controller');
const router = require('express').Router();
router.post("/",validateemailController.validateemail);
exports = module.exports = router;
