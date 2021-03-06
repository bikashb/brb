var userDetailsController = require('./userdetails.controller');
const router = require('express').Router();
router.post("/",userDetailsController.getAll);
router.get("/exercise/:id",userDetailsController.getByExercise);
router.get("/course/:id",userDetailsController.getByCourse);
router.get("/:user_name",userDetailsController.getUserDetails);
router.get("/profiledetails/:id",userDetailsController.userdetailsbyId);
router.put("/updateprofile",userDetailsController.updateprofile);
router.put("/updatepassword",userDetailsController.changepassword);
exports = module.exports = router;
