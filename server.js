/**
 * This is the test server. 
 * It will take in the middleware and database module. 
 * It will then initialise them and start.
 */
const bodyParser = require('body-parser');
const express = require("express");
const middleware = require("./dist").middleware;
const database = require("./dist").database;


optionsDatabase = {
	connectString: "mongodb://db:27017",
	collectionName:"products",
	successMessage: "Success"
}

options = {
	url: "/adminpageupload",
	db:database(optionsDatabase),
	unpkgUI:""
}

const port = 3000;
const staticAssets = "./annsummers"

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", port);
app.use(express.static(staticAssets));
app.use(middleware(options));
app.listen(app.get("port"), () => {});
