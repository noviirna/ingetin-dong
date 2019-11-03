const router = require("express").Router();
const userRoutes = require("./user");
const traceIdGenerator = require("../helpers/requestTracer");
const tasksRoutes = require("./tasks");
const projectsRoutes = require("./projects");
const notification = require("./notification");
const path = require("../constants/endpointsPath");
const { BASE_ENDPOINTS, VERSION, BASE_USER_PATH: USER_PATH } = path;
const { log } = require("../helpers/loggerUtility");
const { statusCode, statusMessage } = require("../constants/httpStatus");

router.get("/sampleapi", function(request, response, next) {
	const TIMESTAMP = request._startTime;
  const IP_ADDRESS =
		request.headers["x-forwarded-for"] || request.connection.remoteAddress;
		
	request.traceId = traceIdGenerator();
	request.timestamp = TIMESTAMP;
	request.headers.remoteAddress = IP_ADDRESS; 
  
  log.info("on routes / with body", request.body, request.traceId);
  response.status(statusCode.OK).json({
    timestamp: TIMESTAMP,
    traceId: request.traceId,
    apiResponse: {
      code: statusCode.OK,
      status: statusMessage.OK,
			message: "The API is running!",
			request: { headers: request.headers, body: request.body },
    }
  });
});

router.get("/sampleapi/error", function(request, response, next) {
  request.traceId = traceIdGenerator();
  request.timestamp = request._startTime;
  const USER_AGENT = request.headers["user-agent"];
  const TIMESTAMP = request._startTime;
  const IP_ADDRESS =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  log.info("on routes / with body", request.body, request.traceId);
  request.name = "Error";
  request.message = "Sample error Bad Request";
  next(request);
});

router.use(BASE_ENDPOINTS + VERSION + USER_PATH, userRoutes);

module.exports = router;
