const processRequest = require("../helpers/requestTracer");
const { generateSuccessResponse } = require("../helpers/apiResponseGenerator");
const UserManagement = require("../services/UserManagement");

class UserController {
  static login(request, response, next) {
    request = processRequest(request);
    UserManagement.login(request.body)
      .then(loginResponse => {
        const message = "login";
        const { code, status, data } = loginResponse;
        const httpResponse = { code, status, message, data };
        generateSuccessResponse(request, response, httpResponse);
      })
      .catch(err => {
        next(err);
      });
  }
  static register(request, response, next) {
    request = processRequest(request);
    const code = statusCode.CREATED;
    const status = statusMessage.CREATED;
    const data = {};
    const message = "register";
    const httpResponse = { code, status, message, data };
    generateSuccessResponse(request, response, httpResponse);
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
