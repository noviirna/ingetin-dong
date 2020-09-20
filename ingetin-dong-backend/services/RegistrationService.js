const User = require("../models/User");
const { statusCode, statusMessage } = require("../constants/httpStatus");
const { compareHash, hashObject } = require("../util/hashingUtil");
const { encode } = require("../util/jwtUtil");
const { log } = require("../helpers/logger");
const { encryptAES } = require("../util/encryptionUtil");
const { uuidv4 } = require("../util/generatorUtil");
const exception = require("../constants/exception");
const { TOKEN_EXPIRATION } = require("../appConfig").configuration;
const UserManagementService = require("./UserManagement");

class RegistrationService {
  static checkSession(loginData) {
    let expirationTime = 600000; // default 10 minute
    // todo : logic for dynamic session time based on parameters in appConfig file
    if (TOKEN_EXPIRATION == "10m") {
    }
    const email = loginData.email;
    const username = loginData.username;
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(foundUserByEmail => {
          if (foundUserByEmail) {
            if (foundUserByEmail.lastLogin == null) {
              resolve();
            } else {
              if (
                foundUserByEmail.lastLogin + expirationTime >
                new Date().getTime()
              ) {
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
                    foundUserByUsername.lastLogin + expirationTime >
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
    let { registrationRequest, traceId } = registerData;
    log.debug(
      "in RegistrationService.register, with param ",
      registrationRequest,
      traceId
    );

    return new Promise((resolve, reject) => {
      try {
        // create user in db
        let createdUser = UserManagementService.addUser(registerData);

        // generate activation code
        let userId = createdUser._id;
        let otp = hashObject(uuidv4);

        let otpId = encode(otp);

        var token = encode({
          userId,
          otpId,
          otpTimestamp: new Date().getTime()
        });

        // send email for activation code

        // generate jwt for activation code

        // generate response
        resolve({
          code: statusCode.CREATED,
          status: statusMessage.CREATED,
          message:
            "Welcome " +
            username +
            "! Login with your email and password to proceed!",
          data: {
            registrationResponse: {
              userId: createdUser._id,
              username: createdUser.username,
              email: createdUser.email,
              token
            }
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = RegistrationService;
