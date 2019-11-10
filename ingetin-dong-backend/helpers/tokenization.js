const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { TOKEN_EXPIRATION } = require("../appConfig");
module.exports = {
	/**
	 * This method is used to convert payload to jwt token
	 * @param {*} payload
	 * @return {String} token
	 */
	encode(payload) {
		console.log("tokenization.js | encode()", payload);
		const token = jwt.sign(
			{
				data: payload,
				// exp: TOKEN_EXPIRATION
			},
			JWT_SECRET
		);
		console.log("Successfully generating token", token);
		return token;
	},
	/**
	 * This method is used to convert jwt token to its payload
	 * @param {String} token
	 * @return {*} payload
	 */
	decode(token) {
		console.log("tokenization.js | decode()", token);
		try {
			const payload = jwt.verify(token, JWT_SECRET);
			console.log("Successfully decoding token");
			return payload;
		} catch (error) {
			console.log("Failed to decode token to object");
			console.log(error);
			error.cause = "Failed to decode jwt token provided";
			next(error);
		}
	}
};
