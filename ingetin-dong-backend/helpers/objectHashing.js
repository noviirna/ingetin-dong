const bcryptjs = require("bcryptjs");

module.exports = {
	/**
	 * This method is used to hash plain object to hashed string
	 * @param {*} plainObject
	 * @returns {String} hash
	 */
	hashObject(plainObject) {
		console.log("objectHashing.js | hashObject()", plainObject);
		const hash = bcryptjs.hashSync(String(plainObject), process.env.SALT);
		return hash;
	},
	/**
	 * This method is used to check whether the hashed string is valid
	 * @param {String} hashedString
	 * @returns {boolean} compareResult
	 */
	compareHash(hashedString) {
		console.log("objectHashing.js | compareHash()", hashedObject);
		const compareResult = bcryptjs.compareSync(hashedString, process.env.SALT);
		return compareResult;
	}
};
