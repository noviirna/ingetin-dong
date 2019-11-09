const { statusCode, statusMessage } = require("../constants/httpStatus");
module.exports = {
  errorName: {
    USER_NOT_EXIST: "UserIsNotExist",
    USERNAME_PASSWORD_WRONG: "UsernameOrPasswordWrong",
    TOKEN_EXPIRED: "TokenExpiredError",
    VALIDATION_ERROR: "ValidationError"
  },
  errorResponse: {
    USER_NOT_EXIST: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST
    },
    USERNAME_PASSWORD_WRONG: {
      code: statusCode.BAD_REQUEST,
      status: statusMessage.BAD_REQUEST
    },
    TOKEN_EXPIRED: {
      code: statusCode.UNAUTHORIZED,
      status: statusMessage.UNAUTHORIZED
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
  errorMessage: {
    USERNAME_PASSWORD_WRONG:
      "You are entering wrong username / password. Please Try Again."
  }
};
