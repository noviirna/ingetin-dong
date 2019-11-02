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
    if(!isCaseSensitive || isCaseSensitive === "false" || isCaseSensitive === 0){
      let longStringLowerCase = longString.toLowerCase();
      let shortStringLowerCase = shortString.toLowerCase();
      value = longStringLowerCase.indexOf(shortStringLowerCase) > -1;
    }
		return value;
  },
  /**
	 * This method is used to check whether you have set up the running environment as you wish
	 * @param String runningEnvironment 
   * @param String targetEnvironment  
	 * @returns Boolean value, will return true if runningEnvironment is same as targetEnvironment
	 */
  environmentChecker(runningEnvironment, targetEnvironment){
    return this.checkIfWordExist(runningEnvironment, targetEnvironment, false);
  }
};