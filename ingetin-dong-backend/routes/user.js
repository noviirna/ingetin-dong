const router = require("express").Router();
const { USER_LOGIN } = require("../constants/endpointsPath").USER_PATH;
router.get(USER_LOGIN, function(request, response, next) {
	response.status(200).json({
		request,
		apiResponse: {}
	});
});

module.exports = router;
