/**
 * This is the test server. 
 * It will take in the middleware and database module. 
 * It will then initialise them and start.
 */
const bodyParser = require('body-parser');
const express = require("express");
const middleware = require("./dist").middleware;
const database = require("./dist").database;

const staticAssets = "./annsummers"
/**
 * This will either update the current data with a new variable or it will specify a type for that variable or both.
 * The types describe how the middleware and UI should be create.
 * If none specified then default string change used. 
 */
const layout = [
	{
		name: "category",
		type: "category"
	},
]

optionsDatabase = {
	connectString: "mongodb://db:27017",
	collectionName:"products",
	successMessage: "Success",
	inputFile: "./data.json",
	logLevel: 0,
	layout: layout,
}

options = {
	url: "/adminpageupload",
	db:database(optionsDatabase),
	unpkgUI:"",
	staticAssets: staticAssets
}

const port = 3000;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", port);
app.use(express.static(staticAssets));
app.use(middleware(options));
app.listen(app.get("port"), () => {});
