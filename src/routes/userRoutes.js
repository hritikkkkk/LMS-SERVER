const express = require("express");
const { authenticate } = require("../middleware/auth");
const { UserController } = require("../controllers");

const router = express.Router();

router.post("/login", UserController.userLogin);

router.post("/enroll/:courseId", authenticate, UserController.userEnroll);
router.get("/check-enrollment", authenticate, UserController.checkEnroll);
router.get("/enrolledCourses", authenticate, UserController.enrolledCourses);

module.exports = router;
