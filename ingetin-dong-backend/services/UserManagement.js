const User = require("../models/User");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { compareHash, hashObject } = require("../util/hashingUtil");
const { decryptAES } = require("../util/encryptionUtil");
const { encode } = require("../util/jwtUtil");
const exception = require("../constants/exception");
const { log } = require("../helpers/logger");
const { TOKEN_EXPIRATION } = require("../appConfig").configuration;
const userConstant = require("../constants/user/userConstant");
const { USER_STATUS } = userConstant;

class UserManagementService {
  static addUser(registrationData) {
    let { registrationRequest, traceId } = registerData;
    log.info(
      "in UserManagementService.addUser, with param ",
      registrationRequest,
      traceId
    );

    return new Promise((resolve, reject) => {
      let decryptedPassword = decryptAES(registrationRequest.password);
      log.debug(
        "origin password= "
          .concat(registrationRequest.password)
          .concat(" decrypted password=")
          .concat(decryptedPassword),
        traceId
      );

      User.create({
        email: registrationRequest.email,
        password: decryptedPassword,
        username: registrationRequest.username,
        status: USER_STATUS.NOTACTIVATED.value,
        lastLogin: null
      })
        .then(createdUser => {
          log.info("Success create user ", createdUser._id, traceId);
          resolve({ ...createdUser });
        })
        .catch(error => {
          log.error(
            "Exception happen in UserManagementService.addUser",
            error,
            traceId
          );
          reject(error);
        });
    });
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      User.findById(userId)
        .then(found => {
          resolve(found);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(found => {
          resolve(found);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      User.findOne({ username })
        .then(found => {
          resolve(found);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static blockUser(userId) {
    return new Promise((resolve, reject) => {});
  }
}

module.exports = UserManagementService;
