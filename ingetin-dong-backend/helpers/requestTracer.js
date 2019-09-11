module.exports = function(request) {
	request.traceId = Date.now();
	return request;
};
