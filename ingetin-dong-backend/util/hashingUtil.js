const bcryptjs = require("bcryptjs");

module.exports = {
  /**
   * This method is used to hash plain object to hashed string
   * @param {*} plainObject
   * @returns {String} hash
   */
  hashObject(plainObject) {
    try {
      return bcryptjs.hashSync(String(plainObject), process.env.SALT_HASH);
    } catch (error) {
      console.log("error =>", error);
    }
  },
  /**
   * This method is used to check whether the hashed string is valid
   * @param {String} plainString
   * @param {String} hashedString
   * @returns {boolean} compareResult
   */
  compareHash(plainString, hashedString) {
    const compareResult = bcryptjs.compareSync(plainString, hashedString);
    return compareResult;
  }
};
