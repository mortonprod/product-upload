/**
 * This is the middleware which will send the admin and update page to the route specified.
 * The page will be created in production without react and deployed to unpkg. This is done so the user does not have to work out how to get the created asset to run.
 * The app will only specify a CRUD operation and an id to routes which is an extension of route option.
 * It takes all the ids so it know what to pull.
 */

import {InputBuilder} from "./inputBuilder";

export function middleware(options: IOptions) {
    return (req: any, res: any, next: any): any => {
        /**
         * Catch routes and then pass this to the database to update.
         */
        if (req.url === options.url + "/read") {
            options.db.re(req.body.id).then((success: string) => {
                res.send(success);
            }).catch((err: string[]) => {
                res.send(err);
            });
        }else if (req.url === options.url + "/create") {
            options.db.cr(req.body.product).then((success: string) => {
                res.send(success);
            }).catch((err: string[]) => {
                res.send(err);
            });
        }else if (req.url === options.url + "/update") {
            options.db.up(req.body.product).then((success: string) => {
                res.send(success);
            }).catch((err: string[]) => {
                res.send(err);
            });
        }
        if (req.url === options.url + "/delete") {
            options.db.de(req.body.id).then((success: string) => {
                res.send(success);
            }).catch((err: string[]) => {
                res.send(err);
            });
        }else if (req.url === options.url) {
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
        }
        return next();
    };
}
