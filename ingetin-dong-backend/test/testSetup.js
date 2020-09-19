const registration = require("./testSetup-registration");

module.exports = {
  validRegistrationData: registration.constructRegistrationData(
    "User",
    "Last Name",
    "user1",
    "user@mail.com",
    "password",
    "08123456789",
    "default"
  ),
  invalidRegistrationData: {}
};
