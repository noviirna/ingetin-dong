const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { TOKEN_EXPIRATION } = require("../appConfig");
module.exports = {
  /**
   * This method is used to convert payload to jwt token
   * @param {*} payload
   * @return {String} token
   */
  encode(data) {
    return jwt.sign(
      {
        data,
        expiresIn: TOKEN_EXPIRATION
      },
      JWT_SECRET
    );
  },
  /**
   * This method is used to convert payload to jwt token
   * @param {*} payload
   * @param {Integer} expiryIn (minutes)
   * @return {String} token
   */
  encode(data, expiryIn) {
    return jwt.sign(
      {
        data,
        expiresIn: expiryIn + "m"
      },
      JWT_SECRET
    );
  },
  /**
   * This method is used to convert jwt token to its payload
   * @param {String} token
   * @return {*} payload
   */
  decode(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      error.cause = "Failed to decode jwt token provided";
      next(error);
    }
  }
};
