/**
 * This is default database business logic.
 * It takes basic a basic command from the middleware with some json and then update as needed.
 * It is based on promises. You call a create function and it will resolve when we have added to
 * the database or failed. This is used by the middleware directly or can be added to routes in 
 * another application.
 */
import * as fs from "fs";
import {MongoClient} from "mongodb";

export function database(options: IOptionsDatabase): IReturnDatabase {
    let collection: any = null;
    /**
     * If data.json exists then create the database from it if it does not exist already.
     * If it does not exist then pass null to let the createDatabase function to let it know it should create an empty db.
     * Once this is done then connect the database ready for alternation.
     */
    fs.readFile(options.inputFile, "utf8", (err, data) => {
        if (!err) {
            connectDatabase(options, JSON.parse(data)).then((output: {message: string; collection: any}) => {
                console.log(output.message);
                collection = output.collection;
            });
        }else {
            connectDatabase(options, null).then((output: {message: string; collection: any}) => {
                console.log(output.message);
                collection = output.collection;
            });
        }
    });
    /**
     * First it will do a range of check comparing the database and the product you have passed.
     * In the end it returns a lot of errors or a product to save.
     */
    function checksProduct(product: any) {
        return new Promise((resolve: any, reject: any) => {
            const error: string[] = [];
            /**
             * Write all the checks here and then append to string.
             */
            if (!error) {
                resolve(null);
            }else {
                reject(error);
            }
        });
    }
    /**
     * Make some basic check like does the id exist...
     */
    function checksId(id: string) {
        return new Promise((resolve: any, reject: any) => {
            const error: string[] = [];
            /**
             * Write all the checks here and then append to string.
             */
            if (!error) {
                resolve(null);
            }else {
                reject(error);
            }
        });
    }
    /**
     * Create a product with a unique id.
     * It will resolve with success or failure string.
     */
    function cr(product: any): any {
        return new Promise((resolve, reject) => {
            checksProduct(product).then((result: any) => {
                /**
                 * Add to database now.
                 */
                resolve(options.successMessage);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * This function will get a product with a particular id.
     */
    function re(id: any): any {
        return new Promise((resolve, reject) => {
            checksId(id).then((result: any) => {
                /**
                 * Add to database now.
                 */
                resolve(options.successMessage);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * This function will update the database entry with the unique id.
     */
    function up(product: any): any {
        return new Promise((resolve, reject) => {
            checksProduct(product).then((result: any) => {
                /**
                 * Add to database now.
                 */
                resolve(options.successMessage);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * Delete a particular id.
     */
    function de(id: any): any {
        return new Promise((resolve, reject) => {
            checksId(id).then((result: any) => {
                /**
                 * Add to database now.
                 */
                resolve(options.successMessage);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * This function will get all the information we need about all the products.
     * We will need information like what is all the ids and categories.
     */
    function co(): any {
        return new Promise((resolve, reject) => {
            const combination: any = [];
            /**
             * Get all ids
             */
            resolve(combination);
        });
    }
    return {
        co,
        cr,
        de,
        re,
        up,
    };
}
/**
 * This is a utility function which comes with the module.
 * It will create the database you will use with the database module.
 * You should call this before you initialise the database.
 * It will only create the database if it does not already exist.
 * It will also create the collection we need if it does not exist to begin with.
 * The database will also connect to static assets. You must make sure the location of the assets
 * matches the location of the assets on the server.
 * It returns a promise with a string when the final database is ready for you to access
 */
function connectDatabase(options: IOptionsDatabase, input: any[]): any {
    return new Promise((resolve, reject) => {
        MongoClient.connect(options.connectString, (errCon, db) => {
            db.collection(options.collectionName, (errCol, col) => {
                col.count({}, (errCount, count) => {
                    if (count > 0) {
                        resolve(createOutput("The collection exists so do nothing. Entries: " + count + " err: " + errCol, col));
                    }else {
                        if (input) {
                            attachUniqueDocuments(col, input).then((colOutput: any) => {
                                resolve(createOutput("The collection does not exist so create it with input.", colOutput));
                            });
                        }else {
                            resolve(createOutput("The collection does not exist or input so just create empty db.", col));
                        }
                    }
                });
            });
        });

    });
}
/**
 * This function will take in a json and save it to the database.
 * It will take only unique ids. If a repeated id is found then it is not added.
 * When it is complete it will resolve. Must check resolve in possible end states.
 */
function attachUniqueDocuments(col: any, input: any) {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (const ei of input){
            col.count({id: ei.id}, (errCount: any, count: any) => {
                // console.log("count container: " + count);
                if (count === 0) {
                    col.insert(ei, (err: any, result: any) => {
                        counter++;
                        console.log("insert " + JSON.stringify(result) + " " + counter + " " + Number(input.length - 1));
                        if (counter === input.length - 1) {
                            resolve(col);
                        }
                    });
                }else {
                    counter++;
                    console.log("Skip, dublicate id: " + ei.id);
                    if (counter === input.length - 1) {
                        resolve(col);
                    }
                }
            });
        }
    });
}
/**
 * Package the output to database.
 */
function createOutput(message: string, col: any) {
    const output: any = {message: null, collection: null};
    output.message = message;
    output.collection = col;
    return output;
}
