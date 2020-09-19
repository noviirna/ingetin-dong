require("dotenv").config();

const chai = require("chai");
const assert = chai.assert;
const encryptionUtil = require("../util/encryptionUtil");

/* SETTING UP THE MOCK USERS */

var plainObject = { string: "String", int: 1, array: [] };
var plainString = "Hello";
let encryptedString;
let encryptedObject;

describe("encryptionUtilTest", () => {
  describe("1. Encryption RSA Test", () => {
    encryptedString = encryptionUtil.encryptAES(plainString);
    encryptedObject = encryptionUtil.encryptAES(plainObject);

    it("- encryption result should not be null", done => {
      assert.isNotNull(encryptedString);
      done();
    });
    it("- encryption result should be string", done => {
      assert.isString(encryptedObject);
      done();
    });
  });

  describe("2. Decryption RSA Test", () => {
    it("- decrypted result should be ".concat(plainString), () => {
      assert.strictEqual(
        plainString,
        encryptionUtil.decryptAES(encryptedString)
      );
    });

    it(
      "- encryption result should be ".concat(JSON.stringify(plainObject)),
      () => {
        assert.deepEqual(
          plainObject,
          encryptionUtil.decryptAES(encryptedObject)
        );
      }
    );
  });
});
