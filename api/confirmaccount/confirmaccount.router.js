var confirmaccountController = require('./confirmaccount.controller');
const router = require('express').Router();
router.get("/:user",confirmaccountController.confirmaccount);
exports = module.exports = router;
