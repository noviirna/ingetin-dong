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
  }
};
