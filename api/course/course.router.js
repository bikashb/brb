var courseController = require('./course.controller');
const router = require('express').Router();
router.post("/assign",courseController.assign);
router.post("/create",courseController.createCourse);
router.get("/:id",courseController.fetchCoursesById);
router.get("/exercise/:id",courseController.fetchExercisesByCourse);
exports = module.exports = router;
