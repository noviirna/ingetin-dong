const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
const { statusCode, statusMessage } = require("../constants/httpStatus");
module.exports = function(error, rawRequest, response, next) {
  const errorName = error.name;
  const errorMessage = error.message;
  const request = {
    headers: rawRequest.headers,
    body: rawRequest.body
  };

  if (checkIfWordExist(errorName, "ValidationError", false)) {
    response.status(statusCode.BAD_REQUEST).json({
			timestamp: rawRequest.timestamp,
      traceId: rawRequest.traceId,
      apiError: {
        code: statusCode.BAD_REQUEST,
        status: statusMessage.BAD_REQUEST,
				message: errorMessageGenerator(errorMessage),
				request,
      }
    });
  } else if (checkIfWordExist(errorName, "TokenExpiredError", false)) {
    response.status(statusCode.UNAUTHORIZED).json({
			timestamp: rawRequest.timestamp,
      traceId: rawRequest.traceId,
      apiError: {
        code: statusCode.UNAUTHORIZED,
        status: statusMessage.UNAUTHORIZED,
				message: errorMessageGenerator(errorMessage),
				request,
      }
    });
  } else {
    response.status(statusCode.INTERNAL_SERVER_ERROR).json({
			timestamp: rawRequest.timestamp,
      traceId: rawRequest.traceId,
      apiError: {
        code: statusCode.INTERNAL_SERVER_ERROR,
        status: statusMessage.INTERNAL_SERVER_ERROR,
				message: "Internal Server Error",
				request
      }
    });
  }
};
