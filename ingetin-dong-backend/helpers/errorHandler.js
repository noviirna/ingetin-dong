const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
module.exports = function(error, request, response, next) {
	const errorName = error.name;
	const errorMessage = error.message;
	const request = {
		headers: request.headers,
		body: request.body
	};

	if (checkIfWordExist(errorName, "ValidationError", false)) {
		response.status(400).json({
			request,
			apiError: {
				code: "400",
				status: "Bad Request",
				message: errorMessageGenerator(errorMessage)
			}
		});
	} else if (checkIfWordExist(errorName, "TokenExpiredError", false)) {
		response.status(401).json({
			request,
			apiError: {
				code: "401",
				status: "Unauthorized",
				message: errorMessageGenerator(errorMessage)
			}
		});
	} else {
		response.status(500).json({
			request,
			apiError: {
				code: "500",
				status: "Internal Server Error",
				message: "Internal Server Error"
			}
		});
	}
};
