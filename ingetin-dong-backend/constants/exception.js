const { statusCode, statusMessage } = require("../constants/httpStatus");

const exceptionMessage = {
  USERNAME_PASSWORD_WRONG: "Invalid Credentials!",
  USER_ALREADY_LOGIN: "User already logged in.",
  TOKEN_EXPIRED: "Your access token is invalid."
};

const exceptionConstant = {
  errorName: {
    USER_NOT_EXIST: "UserIsNotExist",
    USERNAME_PASSWORD_WRONG: "UsernameOrPasswordWrong",
    TOKEN_EXPIRED: "TokenExpiredError",
    VALIDATION_ERROR: "ValidationError",
    USER_ALREADY_LOGIN: "UserAlreadyLogin"
  },
  errorResponse: {
    USER_NOT_EXIST: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST
    },
    USERNAME_PASSWORD_WRONG: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST,
      message: exceptionMessage.USERNAME_PASSWORD_WRONG
    },
    USER_ALREADY_LOGIN: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST,
      message: exceptionMessage.USER_ALREADY_LOGIN
    },
    TOKEN_EXPIRED: {
      code: statusCode.UNAUTHORIZED,
      status: statusMessage.UNAUTHORIZED,
      message: exceptionMessage.TOKEN_EXPIRED
    },
    VALIDATION_ERROR: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST
    },
    GENERAL_ERROR: {
      code: statusCode.INTERNAL_SERVER_ERROR,
      status: statusMessage.INTERNAL_SERVER_ERROR
    }
  },
  errorMessage: { ...exceptionMessage }
};

module.exports = { ...exceptionConstant };
