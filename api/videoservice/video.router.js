var videoController = require('./video.controller');
const router = require('express').Router();
router.post("/upload",videoController.uploadFile);
router.post("/",videoController.getAll);
exports = module.exports = router;
