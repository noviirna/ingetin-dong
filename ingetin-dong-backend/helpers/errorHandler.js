const errorMessageGenerator = require("./errorMessageGenerator.js");
const { generateErrorResponse } = require("./apiResponseGenerator");
const { errorName, errorResponse } = require("../constants/exception");

function processTheError(error) {
  console.log(error)
  let response;
  switch (error.name) {
    case errorName.VALIDATION_ERROR:
      response = errorResponse.VALIDATION_ERROR;
      break;
    case errorName.TOKEN_EXPIRED:
      response = errorResponse.TOKEN_EXPIRED;
      break;
    case errorName.USERNAME_PASSWORD_WRONG:
      response = errorResponse.USERNAME_PASSWORD_WRONG;
      break;
    case errorName.USER_ALREADY_LOGIN:
      response = errorResponse.USER_ALREADY_LOGIN;
      break;
    default:
      response = errorResponse.GENERAL_ERROR;
  }

  return {
    ...response,
    message: errorMessageGenerator(response.message || error.message)
  };
}

module.exports = function(error, request, response, next) {
  const processedResponse = processTheError(error);
  generateErrorResponse(request, response, processedResponse);
};
