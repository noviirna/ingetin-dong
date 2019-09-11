const errorMessageHandler = require("./errorMessageGenerator.js");

module.exports = function(error, request, response, next) {
	const errorName = error.name;
	const errorCode = error.code;
	const errorMessage = error.message;
	const request = {
		headers: request.headers,
		body: request.body
	};

	if ("ValidationError".indexOf(errorName) > -1) {
		response.status(400).json({
			request,
			apiError: {
				code: "400",
				status: "",
				message: errorMessageHandler(errorMessage)
			}
		});
	} else if ("TokenExpiredError".indexOf(errorName) > -1) {
		response.status(401).json({
			request,
			apiError: {
				code: "401",
				status: "",
				message: errorMessageHandler(errorMessage)
			}
		});
	} else {
		response.status(500).json({
			request,
			apiError: {
				code: "",
				status: "",
				message: "Internal Server Error"
			}
		});
	}
};
