var subscriptionController = require('./subscription.controller');
const router = require('express').Router();
router.post("/",subscriptionController.subscribe);
exports = module.exports = router;
