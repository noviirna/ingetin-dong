const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
const { generateErrorResponse } = require("./apiResponseGenerator");
const { errorName, errorResponse } = require("../constants/exception");

function processTheError(error) {
  let response;
  console.log(error);
  if (checkIfWordExist(error.name, errorName.VALIDATION_ERROR, false)) {
    response = errorResponse.VALIDATION_ERROR;
  } else if (checkIfWordExist(error.name, errorName.TOKEN_EXPIRED, false)) {
    response = errorResponse.TOKEN_EXPIRED;
  } else if (
    checkIfWordExist(error.name, errorName.USERNAME_PASSWORD_WRONG, false)
  ) {
    response = errorResponse.USERNAME_PASSWORD_WRONG;
  } else if (
    checkIfWordExist(error.name, errorName.USER_ALREADY_LOGIN, false)
  ) {
    response = errorResponse.USER_ALREADY_LOGIN;
  } else {
    response = errorResponse.GENERAL_ERROR;
  }
  console.log(response);
  return {
    ...response,
    message: errorMessageGenerator(response.message || error.message)
  };
}

module.exports = function(error, request, response, next) {
  const processedResponse = processTheError(error);
  generateErrorResponse(request, response, processedResponse);
};
