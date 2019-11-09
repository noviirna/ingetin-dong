const User = require("../models/User");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { compareHash } = require("../helpers/objectHashing");
const { encode } = require("../helpers/tokenization");
const exception = require("../constants/exception");

class UserManagementService {
  static login(loginData) {
    const email = loginData.email;
    const password = loginData.password;

    return new Promise(resolve, reject => {
      User.findOne({ email })
        .then(foundUser => {
          if (foundUser) {
            const hashedPassword = foundUser.password;
            const isPasswordRight = compareHash(password, hashedPassword);

            if (isPasswordRight) {
              resolve({
                code: statusCode.OK,
                status: statusMessage.OK,
                data: { access_token: encode(foundUser) }
              });
            } else {
              reject({
                name: exception.errorName.USERNAME_PASSWORD_WRONG,
                message: exception.errorMessage.USERNAME_PASSWORD_WRONG
              });
            }
            
          } else {
            reject({
              name: exception.errorName.USERNAME_PASSWORD_WRONG,
              message: exception.errorMessage.USERNAME_PASSWORD_WRONG
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = UserManagementService;
