const { RUNTIME_ID } = require("../appConfig").configuration;
function generateLogTemplate(typeOfTemplate, traceId) {
  let template;

  if (traceId == undefined) {
    traceId = "";
  } else {
    traceId = traceId + " - ";
  }

  switch (typeOfTemplate.toLowerCase()) {
    case "info":
      template =
        "\n[ INFO ] - " +
        RUNTIME_ID +
        " - " +
        traceId +
        process.env.NODE_ENV +
        " - " +
        new Date().toTimeString() +
        "\n";
      break;
    case "error":
      template =
        "\n[ ERROR ] - " +
        RUNTIME_ID +
        " - " +
        traceId +
        process.env.NODE_ENV +
        " - " +
        new Date().toTimeString() +
        "\n";
      break;
  }
  return template;
}


module.exports = {
  /**
   * This method is used to write custom log message with timestamps
   * @param String message
   * @param any object
   * @returns void, not returning anything
   */
  log: {
    info(message, object, traceId) {
      if (undefined !== object) {
        console.log(generateLogTemplate("info", traceId) + message, object);
      } else {
        console.log(generateLogTemplate("info", traceId) + message);
      }
    },
    error(message, object, traceId) {
      if (undefined !== object) {
        console.log(generateLogTemplate("error", traceId) + message, object);
      } else {
        console.log(generateLogTemplate("error", traceId) + message);
      }
    }
  }
};
