const express = require("express");

const { authenticate, authorizeRole } = require("../middleware/auth");
const { CourseController } = require("../controllers");

const router = express.Router();

router.post(
  "/courses",
  authenticate,
  authorizeRole("admin"),
  CourseController.AddCourse
);

router.get("/courses", CourseController.getAllCourse);

router.put(
  "/courses/:id",
  authenticate,
  authorizeRole("admin"),
  CourseController.updateCourse
);

router.delete(
  "/courses/:id",
  authenticate,
  authorizeRole("admin"),
  CourseController.deleteCourse
);

module.exports = router;
