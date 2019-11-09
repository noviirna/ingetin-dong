const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { generateErrorResponse } = require("./apiResponseGenerator");
const { errorName, errorResponse } = require("../constants/exception");

function processTheError(error) {
  let response;
  if (checkIfWordExist(error.name, errorName.VALIDATION_ERROR, false)) {
    response = errorResponse.VALIDATION_ERROR;
  } else if (checkIfWordExist(error.name, errorName.TOKEN_EXPIRED, false)) {
    response = errorResponse.TOKEN_EXPIRED;
  } else if (
    checkIfWordExist(error.name, errorName.USERNAME_PASSWORD_WRONG, false)
  ) {
    response = errorResponse.USERNAME_PASSWORD_WRONG;
  } else {
    response = errorResponse.GENERAL_ERROR;
  }
  return {
    ...response,
    message: errorMessageGenerator(error.message)
  };
}

module.exports = function(error, request, response, next) {
  const processedResponse = processTheError(error);
  generateErrorResponse(request, response, processedResponse);
};
