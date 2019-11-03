const router = require("express").Router();
const userRoutes = require("./user");
const processRequest = require("../helpers/requestTracer");
const { generateSuccessResponse } = require("../helpers/apiResponseGenerator");
const tasksRoutes = require("./tasks");
const projectsRoutes = require("./projects");
const notification = require("./notification");
const path = require("../constants/endpointsPath");
const { BASE_ENDPOINTS, VERSION, BASE_USER_PATH } = path;
const { statusCode, statusMessage } = require("../constants/httpStatus");

router.get("/sampleapi", function(request, response, next) {
  request = processRequest(request);
  const code = statusCode.OK;
  const status = statusMessage.OK;
  const data = {};
  const message = "successful";
  const httpResponse = { code, status, message, data };
  generateSuccessResponse(request, response, httpResponse);
});

router.get("/sampleapi/error", function(request, response, next) {
  request = processRequest(request);
  request.name = "Error";
  request.message = "Sample error Bad Request";
  next(request);
});

router.use(BASE_ENDPOINTS + VERSION + BASE_USER_PATH, userRoutes);

module.exports = router;
