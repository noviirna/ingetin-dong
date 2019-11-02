const router = require("express").Router();
const userRoutes = require("./user");
const traceIdGenerator = require("../helpers/requestTracer");
const tasksRoutes = require("./tasks");
const projectsRoutes = require("./projects");
const notification = require("./notification");
const path = require("../constants/endpointsPath");
const { BASE_ENDPOINTS, VERSION, BASE_USER_PATH: USER_PATH } = path;
const { log } = require("../helpers/loggerUtility");
const {statusCode, statusMessage} = require("../constants/httpStatus");

router.get("/", function(request, response, next) {
	request.traceId = traceIdGenerator();
	request.timestamp = request._startTime;
	const USER_AGENT = request.headers['user-agent'];
	const TIMESTAMP = request._startTime;
	const IP_ADDRESS = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
	
	response.status(statusCode.OK).json({
		timestamp: TIMESTAMP,
		traceId: request.traceId,
		status: statusCode.OK,
		message: statusMessage.OK,
		apiResponse: {
			message: "The API is running!"
		}
	});
});

router.use(BASE_ENDPOINTS + VERSION + USER_PATH , userRoutes);

module.exports = router;
