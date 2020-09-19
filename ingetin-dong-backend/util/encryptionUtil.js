var CryptoJS = require("crypto-js");
const { AES_SALT } = require("../appConfig").configuration;

module.exports = {
  encryptAES(plainData) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(plainData),
        AES_SALT
      ).toString();
    } catch (error) {
      // console.log(error);
    }
  },
  decryptAES(encryptedData) {
    return JSON.parse(
      CryptoJS.AES.decrypt(encryptedData, AES_SALT).toString(CryptoJS.enc.Utf8)
    );
  }
};
