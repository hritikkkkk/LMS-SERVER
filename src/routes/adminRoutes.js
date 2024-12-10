const express = require("express");

const { authenticate, authorizeRoles } = require("../middleware/auth");
const { CourseController } = require("../controllers");

const router = express.Router();

router.post("/courses", authenticate, CourseController.AddCourse);

router.get("/courses", CourseController.getAllCourse);

router.put("/courses/:id", authenticate, CourseController.updateCourse);

router.delete("/courses/:id", authenticate, CourseController.deleteCourse);

module.exports = router;
