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
    MongoClient.connect(options.connectString, (errCon, db) => {
        db.collection(options.collectionName, (errCol, col) => {
            if (!errCol) {
                console.log("Accessed " + options.collectionName  + " collection");
                collection = col;
            }else{
                console.log("Didn't accessed " + options.collectionName  + " collection");
            }
        });
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
