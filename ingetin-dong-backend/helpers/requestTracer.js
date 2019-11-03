const { log } = require("./loggerUtility");
module.exports = function(request) {
  let generatedId = "";
  let characterList =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

  for (let count = 1; count <= 16; count++) {
    generatedId += characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    );
    if (count % 4 == 0 && count < 16) {
      generatedId += "-";
    }
  }
  const TIMESTAMP = request._startTime;
  const IP_ADDRESS =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  request.traceId = generatedId;
  request.timestamp = TIMESTAMP;
  request.headers.remoteAddress = IP_ADDRESS;

  let accessToken;
  if (request.headers.authorization !== undefined) {
    let token = request.headers.authorization.replace("Bearer ", "");
    accessToken = `| access-token: "${token}" `;
  }

  log.info(
    `${request.method} "${request.url}" | timestamp: ${new Date(request.timestamp).toISOString()} | ipAddress: ${IP_ADDRESS} ${accessToken}| body: `,
    request.body,
    generatedId
  );
  return request;
};
