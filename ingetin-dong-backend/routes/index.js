const router = require("express").Router();
const userRoutes = require("./user");
const tasksRoutes = require("./tasks");
const projectsRoutes = require("./projects");
const notification = require("./notification");
const path = require("../constants/endpointsPath");
const { BASE_ENDPOINTS, VERSION, BASE_USER_PATH: USER_PATH } = path;

router.get("/", function(request, response, next) {
	console.log("yea");
	response.status(200).json({
		request,
		apiResponse: {
			message: "The API is running!"
		}
	});
});

router.use(BASE_ENDPOINTS + VERSION + USER_PATH , userRoutes);

module.exports = router;
