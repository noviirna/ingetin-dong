const User = require("../models/User");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { compareHash } = require("../helpers/objectHashing");
const { encode } = require("../helpers/tokenization");
const exception = require("../constants/exception");

class UserManagementService {
  static checkSession(loginData) {
    const email = loginData.email;
    const username = loginData.username;
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(foundUserByEmail => {
          if (foundUserByEmail) {
            if (foundUserByEmail.lastLogin == null) {
              resolve();
            } else {
              if (foundUserByEmail.lastLogin + 600000 > new Date().getTime()) {
                reject({
                  name: exception.errorName.USER_ALREADY_LOGIN
                });
              } else {
                resolve();
              }
            }
          } else {
            User.findOne({ username }).then(foundUserByUsername => {
              if (foundUserByUsername) {
                if (foundUserByUsername.lastLogin == null) {
                  resolve();
                } else {
                  if (
                    foundUserByUsername.lastLogin + 600000 >
                    new Date().getTime()
                  ) {
                    console.log("session check reject");
                    reject({
                      name: exception.errorName.USER_ALREADY_LOGIN
                    });
                  } else {
                    resolve();
                  }
                }
              } else {
                reject({
                  name: exception.errorName.USERNAME_PASSWORD_WRONG
                });
              }
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static login(loginData) {
    const email = loginData.email;
    const password = loginData.password;
    const username = loginData.username;

    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(foundUserByEmail => {
          if (foundUserByEmail) {
            const hashedPassword = foundUserByEmail.password;
            console.log(hashedPassword + " " + foundUserByEmail);
            const isPasswordRight = compareHash(password, hashedPassword);
            if (isPasswordRight) {
              User.findOneAndUpdate(
                { email },
                {
                  lastLogin: new Date().getTime()
                }
              )
                .then(() => {
                  resolve({
                    code: statusCode.OK,
                    status: statusMessage.OK,
                    message: "Login succesful with email " + email,
                    data: { access_token: encode(foundUserByEmail) }
                  });
                })
                .catch(reject);
            } else {
              reject({
                name: exception.errorName.USERNAME_PASSWORD_WRONG
              });
            }
          } else {
            User.findOne({ username }).then(foundUserByUsername => {
              if (foundUserByUsername) {
                const hashedPassword = foundUserByUsername.password;
                const isPasswordRight = compareHash(password, hashedPassword);
                if (isPasswordRight) {
                  User.findOneAndUpdate(
                    { username },
                    {
                      lastLogin: new Date().getTime()
                    }
                  )
                    .then(() => {
                      resolve({
                        code: statusCode.OK,
                        status: statusMessage.OK,
                        message: "Login succesful with username " + username,
                        data: { access_token: encode(foundUserByUsername) }
                      });
                    })
                    .catch(reject);
                } else {
                  reject({
                    name: exception.errorName.USERNAME_PASSWORD_WRONG
                  });
                }
              } else {
                reject({
                  name: exception.errorName.USERNAME_PASSWORD_WRONG,
                  message: exception.errorMessage.USERNAME_PASSWORD_WRONG
                });
              }
            });
          }
        })
        .catch(reject);
    });
  }

  static register(registerData) {
    const email = registerData.email;
    const password = registerData.password;
    const username = registerData.username;

    return new Promise((resolve, reject) => {
      User.create({ email, password, username, lastLogin: null })
        .then(createdUser => {
          resolve({
            code: statusCode.CREATED,
            status: statusMessage.CREATED,
            message: "Success creating user " + createdUser.username,
            data: {
              userId: createdUser._id,
              username: createdUser.username,
              email: createdUser.email
            }
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = UserManagementService;
