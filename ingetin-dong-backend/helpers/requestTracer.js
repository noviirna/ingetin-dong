module.exports = function(request) {
	request.traceId = Date.now().toPrecision(21);
	return request;
};
