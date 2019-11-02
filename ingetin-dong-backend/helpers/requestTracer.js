module.exports = function(request) {
	request.traceId = Date.now().toPrecision();
	return request;
};
