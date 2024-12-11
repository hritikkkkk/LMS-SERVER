const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { userRepository, courseRepository } = require("../repository");
const { ServerConfig } = require("../config");
const jwt = require("jsonwebtoken");

const userRepo = new userRepository();

const courseRepo = new courseRepository();

const userAuthenticate = async (data) => {
  try {
    // Validate userId presence
    if (!data.userId) {
      throw new AppError("UserId is required", StatusCodes.BAD_REQUEST);
    }

    // Check if user exists
    let user = await userRepo.existingUser(data.userId);
    if (!user) {
      // If user does not exist, create a new one
      user = await userRepo.create({ userId: data.userId });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.userId, role: user.role }, // Payload (can include additional info if needed)
      ServerConfig.JWT_SECRET,
      { expiresIn: ServerConfig.JWT_EXPIRY }
    );

    // Return user details and token
    return { user, token };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Error:", error);
      throw new AppError(
        "Failed to authenticate user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

const userEnroll = async (data) => {
  try {
    const { userId, courseId } = data;

    if (!userId || !courseId) {
      throw new AppError(
        "UserId and CourseId are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await userRepo.existingUser(userId);
    if (!user) {
      throw new AppError(
        "No user found for the given userId",
        StatusCodes.NOT_FOUND
      );
    }

    // Check if course exists
    const course = await courseRepo.getOne(courseId);
    if (!course) {
      throw new AppError(
        "No course found for the given courseId",
        StatusCodes.NOT_FOUND
      );
    }

    // Check if user is already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      throw new AppError(
        "User already enrolled in this course",
        StatusCodes.CONFLICT
      );
    }

    user.enrolledCourses.push(courseId);

    await user.save();

    return user;
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Failed to enroll courses due to server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  userAuthenticate,
  userEnroll,
};
