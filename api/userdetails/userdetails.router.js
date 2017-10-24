var userDetailsController = require('./userdetails.controller');
const router = require('express').Router();
router.post("/",userDetailsController.getAll);
router.get("/exercise/:id",userDetailsController.getByExercise);
router.get("/plan/:id",userDetailsController.getByPlan);
router.get("/:user_name",userDetailsController.getUserDetails);
router.get("/profiledetails/:user_name",userDetailsController.userdetailsbyusername);
router.put("/updateprofile",userDetailsController.updateprofile);
exports = module.exports = router;
