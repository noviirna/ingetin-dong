require("dotenv").config();

/**
 * Integration Test
 * Endpoint => "/api/ingetin-dong/user/signup"
 * Case => positive (expecting success result)
 */

const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  BASE_ENDPOINTS,
  APP_VERSION,
  BASE_USER_PATH,
  USER_PATH
} = require("../constants/endpointsPath");
const apiPath =
  BASE_ENDPOINTS + APP_VERSION + BASE_USER_PATH + USER_PATH.USER_REGISTER;
const expect = chai.expect;
chai.use(chaiHttp);

/* SETTING UP THE MOCK USERS */
const setup = require("./testSetup");
var validRegistrationData = setup.validRegistrationData;
const testHelpers = require("./testHelpers");

describe("INTEGRATION TEST - ENDPOINT " + apiPath, function() {
  after(() => {
    console.log(
      "DONE TESTING on registration.positive.test.js\nDELETING ALL TEST DATA...\n"
    );
  });
  describe("POSITIVE TEST CASES - Expecting success result - The request is VALID", function() {
    describe("The request body object is complete", () => {
      describe("Response status: ", function() {
        afterEach(function(done) {
          /* delete the user */
          testHelpers.deleteAllUser();
          done();
        });
        it("should return response status with code 201 / Created", function(done) {
          chai
            .request(app)
            .post(apiPath)
            .send(validRegistrationData)
            .end(function(err, res) {
              console.log(res.body);
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
            });
        });
      });

      describe("Response body: ", function() {
        afterEach(function(done) {
          /* delete the user after done asserting each test cases*/
          testHelpers.deleteAllUser();
          done();
        });
        it("should not be empty", function(done) {
          chai
            .request(app)
            .post(apiPath)
            .send(validRegistrationData)
            .end(function(err, res) {
              console.log(res.body);
              expect(err).to.be.null;
              expect(res.body).to.be.not.undefined;
              done();
            });
        });
        it("should not be null", function(done) {
          chai
            .request(app)
            .post(apiPath)
            .send(validRegistrationData)
            .end(function(err, res) {
              console.log(res.body);
              expect(err).to.be.null;
              expect(res.body).to.be.not.null;
              done();
            });
        });
        it("should be an object", function(done) {
          chai
            .request(app)
            .post(apiPath)
            .send(validRegistrationData)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res.body).to.be.an("object");
              done();
            });
        });
        it(
          "should have key 'message' with value 'Welcome " +
            validRegistrationData.username +
            "! Login with your email and password to proceed!'",
          function(done) {
            chai
              .request(app)
              .post(apiPath)
              .send(validRegistrationData)
              .end(function(err, res) {
                console.log(res.body);
                expect(err).to.be.null;
                expect(res.body).to.have.property("apiSuccessResponse");
                expect(res.body.apiSuccessResponse).to.have.property("message");
                expect(res.body.apiSuccessResponse.message).to.have.string(
                  "Welcome " +
                    validRegistrationData.username +
                    "! Login with your email and password to proceed!"
                );
                done();
              });
          }
        );
      });
    });
  });
});
