const express = require("express");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { UserController } = require("../controllers");

const router = express.Router();

router.post("/login", UserController.userLogin);

router.post(
  "/enroll/:courseId",
  authenticate,
  UserController.userEnroll
);

module.exports = router;
