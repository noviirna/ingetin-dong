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

function checkIfWordExist(shortString, longString, isCaseSensitive) {
  let value = longString.indexOf(shortString) > -1;
  if (
    !isCaseSensitive ||
    isCaseSensitive === "false" ||
    isCaseSensitive === 0
  ) {
    let longStringLowerCase = String.prototype.toLowerCase(longString);
    let shortStringLowerCase = String.prototype.toLowerCase(shortString);
    value = longStringLowerCase.indexOf(shortStringLowerCase) > -1;
  }
  return value;
}

module.exports = {
  /**
   * This method is used to check whether the shortString is existed within the longString
   * @param String shortString
   * @param String longString
   * @param Boolean isCaseSensitive
   * @returns Boolean value, will return true if shortString is exist within longString
   */
  checkIfWordExist: checkIfWordExist,
  /**
   * This method is used to check whether you have set up the running environment as you wish
   * @param String runningEnvironment
   * @param String targetEnvironment
   * @returns Boolean value, will return true if runningEnvironment is same as targetEnvironment
   */
  environmentChecker(runningEnvironment, targetEnvironment) {
    return checkIfWordExist(runningEnvironment, targetEnvironment, false);
  },
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
