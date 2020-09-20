const User = require("../models/User");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { compareHash, hashObject } = require("../util/hashingUtil");
const { encode } = require("../util/jwtUtil");
const exception = require("../constants/exception");
const { TOKEN_EXPIRATION } = require("../appConfig").configuration;
const userConstant = require("../constants/user/userConstant");
const { USER_STATUS } = userConstant;

class UserManagementService {
  static addUser(newUser) {
    return new Promise((resolve, reject) => {
      User.create({
        ...newUser,
        status: USER_STATUS.NOTACTIVATED.value,
        lastLogin: null
      })
        .then(createdUser => {
          resolve({ ...createdUser });
        })
        .catch(error => {
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
