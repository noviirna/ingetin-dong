module.exports = {
  constructRegistrationData(
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    avatarImage
  ) {
    return {
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
      avatarImage
    };
  },
  data: {
    email: {
      validEmail: "novi.irnawati@gmail.com",
      wrongFormatEmail: [
        "novi@mail",
        "novi.com",
        "@novi.com",
        "@.abcd",
        "novi@.com",
        "novi@novi.",
        "novi#123.com"
      ]
    }
  }
};
