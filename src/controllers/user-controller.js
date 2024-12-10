const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { UserService } = require("../services");

const userLogin = async (req, res) => {
  try {
    const response = await UserService.userAuthenticate({
      userId: req.body.userId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const userEnroll = async (req, res) => {
  try {
    const response = await UserService.userEnroll({
      userId: req.user.userId,
      courseId: req.params.courseId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
module.exports = {
  userLogin,
  userEnroll,
};
