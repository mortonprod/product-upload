# Product-upload
[![Build Status](https://travis-ci.org/mortonprod/product-upload.svg?branch=master)](https://travis-ci.org/mortonprod/product-upload)
[![Coverage Status](https://coveralls.io/repos/github/mortonprod/product-upload/badge.svg?branch=master)](https://coveralls.io/github/mortonprod/product-upload?branch=master)
[![npm version](https://badge.fury.io/js/%40mortonprod%2Fproduct-upload.svg)](https://badge.fury.io/js/%40mortonprod%2Fproduct-upload)
[![Dependecies](https://david-dm.org/mortonprod/product-upload.svg)](https://david-dm.org/mortonprod/product-upload.svg)


This is an npm package which acts as a node server to upload products to multiple servers. It can also act for a number of generic upload tasks. Think any situation where you need to upload a list of related objects in a database with images. Given some basic initialising information is will perform basic CRUD operation without you needing to design it.

By default node is used to send the UI and update the database. However, you can also setup the node server to simply send the new values to another server. That server will then run it's own implementation and return some success or failure notice. In the end you have three parts. 

# Parts

* User UI (A generic number of components which will simply take a input json and output json with binary assets).
* Initialised node middleware (It serves the user interface with needed input json and recieves the binary assets).
    * These assets and then redirects or passed to the default implementation to test the input.
* Internal or external middleware to recieve output json and update databases and static assets.
    * Checks to perform on the database for each operation.
    * The changing of the database on the server.

## User UI 

This will be nothing but a series of inputs with a predefined relationships.
Say we have product, what would be the information we will most likely need to store and change?

* ID (string)
* Name (string)
* Price (string) 
* Categories (array of strings)
* Description (string)
* Colour (string)
* Rating (number)
* Size (string)
* Number in stock (number)
* Images (array of strings)
* ...

These can be defined as react component which take some input, you interact with it, then it produces some output.

The output of the UI is then used by the node server to update the database.


## Node Middleware

The node middle ware will recieve the json and assets and then pass this on to an external server or the inbuilt test implementation. Either way the server will wait until it has recieved a success or failure string which is then passed to the user interface.

It will also deal with authentication and cookie handling. You must pass in a mongodb. Check out the version used in package.json if your having problems. 

## Testing the Database

With the current assets the database must be checked before it is updated. The issues will be passed back to the node server as a list. 

## Saving the database 

The entry with the current id will be updated. The entry will link to a single file with a list of unique images. 
In the end it will take in some input, try to save it. If there is an issue then it will return the final issue to the tester. 

When connecting to the mongo db it will simply try to connect and link to the collection you specify. It will not change anything else in your database.

 


## Installation
To install this component into your project run:

`npm install @mortonprod/product-upload`


## Usage

Import the component like so:

`
import Product from @mortonprod/product-upload
`


then import the css:


`
import @mortonprod/product-upload/dist/index.css
` 

Note you must pull the css independently of the component. 


To run in development mode do:

`
npm run start
`

This will run the app on localhost:8080.

# Installing Respository

## Full Running Package 
To build the test server with mongodb attached.

```
npm run server:build
``` 

To start the container

```
npm run server
```

**Note this will stop all containers which you currently have running. A quick hack to make sure you are running the right container.**

## The User interface
If you need to play about with the UI without considering how it will be served the run 

```
npm run watch
```

## Database management

You will most likely have to check the data you are running. 
To do this install mongod to setup your databases server to connect to.  

```
mongod --dbpath=./data/db --port 27017
```

This will just get your databases and then start a server for you to link a shell editor or even node. 


Since you are wanting to check this output of node easily. You will then connect a mongo shell CLI. Bellow is an example of connecting to the running server and then querying the collection names.

```
mongo mongodb://127.0.0.1:27017 --eval 'db.getCollectionNames()'
```


# Scrapper

It also has a basic web-scaper set up to demonstrate functionality. 


It is rather ad-hoc and points at the ann summers sitemap. It will strips each pages 1 hyperlink under the sitemap root, then it looks for a items object in each html page using jsdom. This items object contains everything we need to reconstruct the database. So we pull this object then correct some of the entries to match our static assets pulled with the scrapper. In the end the final data.json file is produced which the mongodb can access and populate it's own database.

To run yourself:

```
npm run scrape
```

## Contributing

You are free to contribute to this component if you wish.
