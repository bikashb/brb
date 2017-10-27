var courseController = require('./course.controller');
const router = require('express').Router();
router.post("/assign",courseController.assign);
router.post("/create",courseController.createCourse);
router.put("/update",courseController.editCourse);
router.get("/:id",courseController.fetchCoursesById);
router.get("/exercise/:id",courseController.fetchExercisesByCourse);
router.delete("/delete/:id",courseController.deleteCourse)
exports = module.exports = router;
