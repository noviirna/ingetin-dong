const processRequest = require("../helpers/requestTracer");
const { generateSuccessResponse } = require("../helpers/apiResponseGenerator");
const RegistrationService = require("../services/RegistrationService");
const { log } = require("../helpers/logger");
class UserController {
  static login(request, response, next) {
    request = processRequest(request);
    UserManagement.checkSession(request.body)
      .then(() => {
        UserManagement.login(request.body)
          .then(loginResponse => {
            response.set("access_token", loginResponse.data.access_token);
            const { code, status, message } = loginResponse;
            generateSuccessResponse(request, response, {
              code,
              status,
              message
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  static register(request, response, next) {
    request = processRequest(request);
    RegistrationService.register(request.body)
      .then(registerResponse => {
        generateSuccessResponse(request, response, registerResponse);
      })
      .catch(err => {
        next(err);
      });
  }
  static activate(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "activate";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static logout(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "logout";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static deactivate(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "deactivate";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static resetPassword(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "resetPassword";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static resetSecureWord(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "resetSecureWord";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static update(request, response, next) {
    request = processRequest(request);
    const code = statusCode.CREATED;
    const status = statusMessage.CREATED;
    const data = {};
    const message = "update";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
  static viewProfile(request, response, next) {
    request = processRequest(request);
    const code = statusCode.OK;
    const status = statusMessage.OK;
    const data = {};
    const message = "viewProfile";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
  }
}

module.exports = UserController;
