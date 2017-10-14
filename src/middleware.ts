/**
 * This is the middleware which will send the admin and update page to the route specified.
 * The page will be created in production without react and deployed to unpkg. This is done so the user does not have to work out how to get the created asset to run.
 * The app will only specify a CRUD operation and an id to routes which is an extension of route option.
 * It takes all the ids so it know what to pull.
 */

import * as express from "express";
import {InputBuilder} from "./inputBuilder";

export function middleware(options: IOptions): any {
    const router = express.Router();
    /**
     * Catch routes and then pass this to the database to update.
     */
    router.get(options.url + "/read", (req: any, res: any, next) => {
        options.db.re(req.body.id).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });

    router.get(options.url + "/create", (req: any, res: any, next) => {
        options.db.cr(req.body.product).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });

    router.get(options.url + "/update", (req: any, res: any, next) => {
        options.db.up(req.body.product).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });
    router.get(options.url + "/delete", (req: any, res: any, next) => {
        options.db.de(req.body.id).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });
    router.get(options.url, (req: any, res: any, next) => {
        options.db.getAll().then((ids: number[]) => {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Upload Component</title>
                <meta name="description" content="It will upload generic product data to server.">
                <meta name="author" content="Alexander Morton">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.production.min.js"></script>
                </head>
                <body>
                <div id="root"></div>
                <section>
                </section>
                <footer>
                    Product Upload component create by Alexander Morton
                </footer>
                <script>window.__IDS__ = ${ids}</script>
                <script src= ${options.unpkgUI}></script>
                </body>
                </html>
            `);
        });
    });
    return router;
}
