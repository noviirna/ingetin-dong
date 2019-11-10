const unusedErrorWords = require("../constants/unusedErrorWords");

/**
 * This method is used to remove any unused words that generated from any error
 * @param {*} message
 * @returns {String} finalMessage
 */
module.exports = function(rawMessage) {
  let finalMessage = rawMessage;
  for (let index = 0; index < unusedErrorWords.length; index++) {
    if (unusedErrorWords[index].indexOf(finalMessage) > -1) {
      finalMessage = finalMessage.replace(unusedErrorWords[index], "");
    }
  }
  return finalMessage;
};
