const router = require('express').Router();
var fileUploadController = require('./upload.controller');
//router.post("/uploadfile",fileUploadController.uploadFile);
router.post("/uploadandregister",fileUploadController.registerFromfile);
exports = module.exports = router;
