// /**
//  * Integration Test
//  * Endpoint => "/api/ingetin-dong/user/signup"
//  * Case => positive (expecting success result)
//  */
// const app = require("../app");
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const assert = chai.assert;
// const expect = chai.expect;

// const endpointPath = "/api/ingetin-dong/user/signup";

// chai.use(chaiHttp);

// /* SETTING UP THE MOCK USERS */
// const setup = require("./testSetup");
// const mockUsers = setup.mockUsers;

// describe("INTEGRATION TEST - ENDPOINT '/api/ingetin-dong/user/signup'", () => {
// 	after(() => {
// 		console.log(
// 			"DONE TESTING on registration.negative.test.js\nDELETING ALL TEST DATA...\n"
// 		);
// 	});
// 	describe("NEGATIVE TEST CASES - Expecting failed result - The request is INVALID", () => {
// 		describe("There is any required object key in request body that is undefined", () => {
// 			describe("firstName is undefined", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});

// 			describe("lastName is undefined", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});
// 		});

// 		describe("There is any required object key in request body that is null", () => {
// 			describe("firstName is null", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});

// 			describe("lastName is null", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});
// 		});

// 		describe("There is any required object key in request body that is contain empty string", () => {
// 			describe("firstName contains empty String", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});

// 			describe("lastName contains empty String", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'Please fill all the required field!'", () => {});
// 				});
// 			});
// 		});

// 		describe("The password key in request body did not fulfill security requirement", () => {
// 			describe("The password length is less than 8 character", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should contain 8 characters or more'", () => {});
// 				});
// 			});
// 			describe("The password does not contain lowercase character", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should contain at least one lowercase character'", () => {});
// 				});
// 			});
// 			describe("The password does not contain uppercase character", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should contain at least one uppercase character'", () => {});
// 				});
// 			});
// 			describe("The password does not contain numeric character", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should contain at least one numeric character'", () => {});
// 				});
// 			});
// 			describe("The password does not contain special character", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should contain at least one special character'", () => {});
// 				});
// 			});
// 			describe("The password contain any whitespace", () => {
// 				describe("Response status: ", () => {
// 					it("should return response status with code 400 / Bad Request", () => {});
// 				});

// 				describe("Response body: ", () => {
// 					it("should not be empty", () => {});
// 					it("should not be null", () => {});
// 					it("should be an object", () => {});
// 					it("should have key 'apiError.message' with value 'The password should not contain space'", () => {});
// 				});
// 			});
// 		});
// 	});

// 	describe("NEGATIVE TEST CASES - Expecting failed result - The request is VALID", () => {
// 		describe("There is a registered user with same email", () => {
// 			before(() => {});
// 			describe("Response status: ", () => {
// 				it("should return response status with code 400 / Bad Request", () => {});
// 			});

// 			describe("Response body: ", () => {
// 				it("should not be empty", () => {});
// 				it("should not be null", () => {});
// 				it("should be an object", () => {});
// 				it("should have key 'apiError.message' with value 'The email address already registered'", () => {});
// 			});
// 		});
// 		describe("There is a registered user with same username", () => {
// 			before(() => {});
// 			describe("Response status: ", () => {
// 				it("should return response status with code 400 / Bad Request", () => {});
// 			});

// 			describe("Response body: ", () => {
// 				it("should not be empty", () => {});
// 				it("should not be null", () => {});
// 				it("should be an object", () => {});
// 				it("should have key 'apiError.message' with value 'The username already registered'", () => {});
// 			});
// 		});
// 		describe("There is a registered user with same phoneNumber", () => {
// 			before(() => {});
// 			describe("Response status: ", () => {
// 				it("should return response status with code 400 / Bad Request", () => {});
// 			});

// 			describe("Response body: ", () => {
// 				it("should not be empty", () => {});
// 				it("should not be null", () => {});
// 				it("should be an object", () => {});
// 				it("should have key 'apiError.message' with value 'The phoneNumber already registered'", () => {});
// 			});
// 		});
// 	});
// });
