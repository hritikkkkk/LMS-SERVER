const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { courseRepository } = require("../repository");

const courseRepo = new courseRepository();

const addCourse = async (data) => {
  try {
    const { title, description, duration, instructor } = data;

    // Input Validation
    if (!title || !description || !duration || !instructor) {
      throw new AppError(
        "All course fields (title, description, duration, instructor) are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const courseData = { title, description, duration, instructor };
    const newCourse = await courseRepo.create(courseData);

    return {
      status: StatusCodes.CREATED,
      message: "Course added successfully",
      course: newCourse,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error("Error adding course:", error);
    throw new AppError(
      "Failed to add course due to server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Update a Course
const updateCourse = async (id, data) => {
  try {
    const updatedCourse = await courseRepo.update(id, data);

    if (!updatedCourse) {
      throw new AppError("Course not found", StatusCodes.NOT_FOUND);
    }

    return {
      status: StatusCodes.OK,
      message: "Course updated successfully",
      course: updatedCourse,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;

    console.error("Error updating course:", error);
    throw new AppError(
      "Failed to update course due to server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete a Course
const deleteCourse = async (id) => {
  try {
    const deletedCourse = await courseRepo.destroy(id);

    if (!deletedCourse) {
      throw new AppError("Course not found", StatusCodes.NOT_FOUND);
    }

    return {
      status: StatusCodes.OK,
      message: "Course deleted successfully",
    };
  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error("Error deleting course:", error);
    throw new AppError(
      "Failed to delete course due to server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


const getAllCourses = async () => {
  try {
    const courses = await courseRepo.getAll();

    return {
      status: StatusCodes.OK,
      message: "Courses fetched successfully",
      courses,
    };
  } catch (error) {
    throw new AppError(
      "Failed to fetch courses due to server error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { addCourse, updateCourse, deleteCourse, getAllCourses };
