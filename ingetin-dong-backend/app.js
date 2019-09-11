require("dotenv").config();

const {
	PRODUCTION_ENVIRONMENT,
	DEVELOPMENT_ENVIRONMENT,
	LOCAL_DB,
	CLOUD_DB,
	APPLICATION_NAME,
	EXPIRE_TIME,
	SERVER_PORT,
	LOG_OUTPUT,
	RUNTIME_ID
} = require("./appConfig").configuration;
const { setTokenExpiration } = require("./appConfig").setter;
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || SERVER_PORT;
const mongoose = require("mongoose");
const errorHandler = require("./helpers/errorHandler");
const routes = require("./routes/index");
const morgan = require("morgan");
const { NODE_ENV } = process.env;
let databaseURL;

if (PRODUCTION_ENVIRONMENT.indexOf(NODE_ENV) > -1) {
	databaseURL = CLOUD_DB;
	setTokenExpiration(EXPIRE_TIME);
	app.use(morgan("common"));
} else {
	databaseURL = LOCAL_DB;
	app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

mongoose
	.connect(databaseURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Database is connected to", databaseURL);
		console.log("\n");
	})
	.catch((error) => {
		console.log("Error while connecting to Database", databaseURL);
		console.log(error);
		console.log("\n");
	});

if (
	PRODUCTION_ENVIRONMENT.indexOf(NODE_ENV) &&
	DEVELOPMENT_ENVIRONMENT.indexOf(NODE_ENV)
) {
	module.export = app;
} else {
	app.listen(PORT, () => {
		console.log("RUNTIME ID", RUNTIME_ID);
		console.log(
			APPLICATION_NAME +
				" is running in " +
				NODE_ENV +
				" environment on port " +
				PORT
		);
	});
}

const fs = require("fs");
const util = require("util");
const logFile = fs.createWriteStream(LOG_OUTPUT, { flags: "a" });

const logStdout = process.stdout;

console.log = function() {
	logFile.write(util.format.apply(null, arguments) + "\n");
	logStdout.write(util.format.apply(null, arguments) + "\n");
};
console.error = console.log;
