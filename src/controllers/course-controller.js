const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { CourseService } = require("../services");

const AddCourse = async (req, res) => {
  try {
    const response = await CourseService.addCourse({
      userId: req.user.userId,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      instructor: req.body.instructor,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await CourseService.updateCourse(
      id,
      data,
      req.user.userId
    );

    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const response = await CourseService.deleteCourse(
      req.params.id,
      req.user.userId
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
const getAllCourse = async (req, res) => {
  try {
    const response = await CourseService.getAllCourses();
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
const getCourse = async (req, res) => {
  try {
    const response = await CourseService.getCourse(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  AddCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
};
