const {
  PRODUCTION_ENVIRONMENT,
  DEVELOPMENT_ENVIRONMENT
} = require("../appConfig").configuration;

function environmentChecker(runningEnvironment, environmentGroup) {
  return environmentGroup.indexOf(runningEnvironment) > -1;
}

module.exports = {
  /**
   * This method is used to check whether the shortString is existed within the longString
   * @param String shortString
   * @param String longString
   * @param Boolean isCaseSensitive
   * @returns Boolean value, will return true if shortString is exist within longString
   */
  checkIfWordExist(shortString, longString, isCaseSensitive) {
    let value = longString.indexOf(shortString) > -1;

    if (
      !isCaseSensitive ||
      isCaseSensitive === "false" ||
      isCaseSensitive === 0
    ) {
      let longStringLowerCase = String(longString).toLowerCase();
      let shortStringLowerCase = String(shortString).toLowerCase();
      value = longStringLowerCase.indexOf(shortStringLowerCase) > -1;
    }
    return value;
  },
  /**
   * This method is used to check whether you have set up the running environment as you wish
   * @param String runningEnvironment
   * @param String[] environmentGroup
   * @returns Boolean value, will return true if runningEnvironment is within environmentGroup
   */
  environmentChecker: environmentChecker,
  /**
   * This method is used to check wheter the running environment is
   * @param String runningEnvironment
   */
  isRunningOnTest(runningEnvironment) {
    return (
      !environmentChecker(runningEnvironment, PRODUCTION_ENVIRONMENT) &&
      !environmentChecker(runningEnvironment, DEVELOPMENT_ENVIRONMENT)
    );
  },
  isRunningOnProduction(runningEnvironment) {
    return environmentChecker(runningEnvironment, PRODUCTION_ENVIRONMENT);
  }
};
