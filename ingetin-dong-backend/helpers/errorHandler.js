const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { generateErrorResponse } = require("./apiResponseGenerator");

function processTheError(error) {
  let code, status;
  if (checkIfWordExist(error.name, "ValidationError", false)) {
    code = statusCode.BAD_REQUEST;
    status = statusMessage.BAD_REQUEST;
  } else if (checkIfWordExist(error.name, "TokenExpiredError", false)) {
    code = statusCode.UNAUTHORIZED;
    status = statusMessage.UNAUTHORIZED;
  } else {
    code = statusCode.INTERNAL_SERVER_ERROR;
    status = statusMessage.INTERNAL_SERVER_ERROR;
  }
  const message = errorMessageGenerator(error.message);
  return {
    code,
    status,
    message
  };
}

module.exports = function(error, request, response, next) {
  const processedResponse = processTheError(error);
  generateErrorResponse(request, response, processedResponse);
};
