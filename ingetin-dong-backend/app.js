/**
 * RUNTIME ENVIRONMENT VARIABLES INITIALIZATION
 */
require("dotenv").config();

/**
 * IMPORT RUNTIME PARAMETERS CONFIGURATION
 */
const {
	PRODUCTION_ENVIRONMENT,
	DEVELOPMENT_ENVIRONMENT,
	LOCAL_DB,
	CLOUD_DB,
	APPLICATION_NAME,
	EXPIRE_TIME,
	SERVER_PORT,
	LOG_OUTPUT,
	RUNTIME_ID,
	REQUEST_MAX_SIZE, //
	LOGGER_CONFIG_PROD, //
	LOGGER_CONFIG_NONPROD //
} = require("./appConfig").configuration;
const PORT = process.env.PORT || SERVER_PORT;
let databaseURL;
let loggerConfig;

/**
 * IMPORT NPM PACKAGES & CUSTOM PACKAGES
 */
const { environmentChecker } = require("./helpers/otherHelpers");
const { log } = require("./helpers/loggerUtility");
const { setTokenExpiration } = require("./appConfig").setter;
const { NODE_ENV } = process.env;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./helpers/errorHandler");
const routes = require("./routes/index");
const morgan = require("morgan");


/**
 * DATABASE, TOKEN EXPIRATION, AND LOGGER PARAMETER CONFIGURATION
 */
if (environmentChecker(NODE_ENV, PRODUCTION_ENVIRONMENT)) {
	databaseURL = CLOUD_DB;
	setTokenExpiration(EXPIRE_TIME);
	loggerConfig = LOGGER_CONFIG_PROD;
} else {
	databaseURL = LOCAL_DB;
	loggerConfig = LOGGER_CONFIG_NONPROD;
}


/**
 * BASIC SERVER RUNTIME SETUP
 */
const app = express();
app.use(cors());
app.use(morgan(loggerConfig));
app.use(express.json({ limit: REQUEST_MAX_SIZE }));
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);



/**
 * DATABASE CONNECTION CONFIGURATION
 */
mongoose
	.connect(databaseURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		log.info("Database is successfully connected (url: " + databaseURL + ")\n");
	})
	.catch((error) => {
		log.error("Error while connecting to Database (url: " + databaseURL + ")\n", error);
	});


/**
 * SET UP RUNTIME BASED ON NODE ENVIRONMENT
 */
if (
	!environmentChecker(NODE_ENV,PRODUCTION_ENVIRONMENT) &&
	!environmentChecker(NODE_ENV,DEVELOPMENT_ENVIRONMENT)
) {
	// SETUP FOR TESTING ENVIRONMENT
	module.export = app; 
} else {
	// SETUP FOR PRODUCTION OR DEVELOPMENT ENVIRONMENT
	app.listen(PORT, () => {
		log.info(
			APPLICATION_NAME +
				" is running in " +
				NODE_ENV +
				" environment on port " +
				PORT + " with runtime id " + RUNTIME_ID
		);
	});
}


/**
 * LOGGER UTIL
 */
const fs = require("fs");
const util = require("util");
const logFile = fs.createWriteStream(LOG_OUTPUT, { flags: "a" });
const logStdout = process.stdout;
console.log = function() {
	logFile.write(util.format.apply(null, arguments) + "\n");
	logStdout.write(util.format.apply(null, arguments) + "\n");
};
console.error = console.log;
