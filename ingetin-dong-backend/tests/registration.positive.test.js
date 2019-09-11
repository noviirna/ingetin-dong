/**
 * Integration Test
 * Endpoint => "/api/ingetin-dong/user/signup"
 * Case => positive (expecting success result)
 */

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const expect = chai.expect;

const endpointPath = "/api/ingetin-dong/user/signup";

chai.use(chaiHttp);

/* SETTING UP THE MOCK USERS */
const setup = require("./testSetup");
const mockUsers = setup.mockUsers;

describe("INTEGRATION TEST - ENDPOINT '/api/ingetin-dong/user/signup'", function() {
	after(() => {
		console.log(
			"DONE TESTING on registration.positive.test.js\nDELETING ALL TEST DATA...\n"
		);
	});
	describe("POSITIVE TEST CASES - Expecting success result - The request is VALID", function() {
		describe("The request body object is complete", () => {
			describe("Response status: ", function() {
				afterEach(function() {
					/* delete the user */
				});
				it("should return response status with code 201 / Created", function() {});
			});

			describe("Response body: ", function() {
				afterEach(function() {
					/* delete the user after done asserting each test cases*/
				});
				it("should not be empty", function() {});
				it("should not be null", function() {});
				it("should be an object", function() {});
				it("should have key 'message' with value 'Welcome user1! Login with your email and password to proceed!'", function() {});
			});
		});
		describe("The request body object only have the required key", () => {
			describe("Response status: ", function() {
				afterEach(function() {
					/* delete the user */
				});
				it("should return response status with code 201 / Created", function() {});
			});

			describe("Response body: ", function() {
				afterEach(function() {
					/* delete the user after done asserting each test cases*/
				});
				it("should not be empty", function() {});
				it("should not be null", function() {});
				it("should be an object", function() {});
				it("should have key 'message' with value 'Welcome user1! Login with your email and password to proceed!'", function() {});
			});
		});
	});
});
