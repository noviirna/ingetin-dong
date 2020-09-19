const { NODE_ENV } = process.env;

function generateLogTemplate(typeOfTemplate, traceId) {
  const runtimeId = require("../appConfig").configuration.RUNTIME_ID;
  const environment = process.env.NODE_ENV;
  const timestamp = new Date().toISOString();
  let messageType;

  if (traceId == undefined) {
    traceId = "";
  } else {
    traceId = " [traceId: " + traceId + "]\n";
  }

  switch (typeOfTemplate.toLowerCase()) {
    case "info":
      messageType = "INFO";
      break;
    case "error":
      messageType = "ERROR";
      break;
  }
  return (
    `\n[ ${messageType} ] [runtimeId: ${runtimeId}] [environment: ${environment}] [timestamp: ${timestamp}]` +
    traceId
  );
}

module.exports = {
  /**
   * This method is used to write custom log message with timestamps
   * @param String message
   * @param any object
   * @returns void, not returning anything
   */
  log: {
    info(message) {
      console.log(generateLogTemplate("info", null) + message);
    },
    info(message, object, traceId) {
      if (NODE_ENV !== "df") {
        if (undefined !== object) {
          console.log(generateLogTemplate("info", traceId) + message, object);
        } else {
          console.log(generateLogTemplate("info", traceId) + message);
        }
      }
    },
    error(message, object, traceId) {
      if (NODE_ENV !== "df") {
        if (undefined !== object) {
          console.log(generateLogTemplate("error", traceId) + message, object);
        } else {
          console.log(generateLogTemplate("error", traceId) + message);
        }
      }
    }
  }
};
