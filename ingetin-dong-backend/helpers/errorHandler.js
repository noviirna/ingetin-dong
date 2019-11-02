const errorMessageGenerator = require("./errorMessageGenerator.js");
const { checkIfWordExist } = require("./otherHelpers");
module.exports = function(error, rawRequest, response, next) {
	const errorName = error.name;
	const errorMessage = error.message;
	const request = {
		headers: rawRequest.headers,
		body: rawRequest.body
	};

	if (checkIfWordExist(errorName, "ValidationError", false)) {
		response.status(400).json({
			request,
			traceId: rawRequest.traceId,
			apiError: {
				code: "400",
				status: "Bad Request",
				message: errorMessageGenerator(errorMessage)
			}
		});
	} else if (checkIfWordExist(errorName, "TokenExpiredError", false)) {
		response.status(401).json({
			request,
			traceId: rawRequest.traceId,
			apiError: {
				code: "401",
				status: "Unauthorized",
				message: errorMessageGenerator(errorMessage)
			}
		});
	} else {
		response.status(500).json({
			request,
			traceId: rawRequest.traceId,
			apiError: {
				code: "500",
				status: "Internal Server Error",
				message: "Internal Server Error"
			}
		});
	}
};
