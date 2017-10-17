/**
 * This is the middleware which will send the admin and update page to the route specified.
 * The page will be created in production without react and deployed to unpkg. This is done so the user does not have to work out how to get the created asset to run.
 * The app will only specify a CRUD operation and an id to routes which is an extension of route option.
 * It also has another default API which is combinations. This is information about all products such as all categories.
 * It takes all the ids so it know what to pull.
 */

import * as express from "express";
import * as fs from "fs";
import * as multer from "multer";
import * as path from "path";
import {InputBuilder} from "./inputBuilder";

export function middleware(options: IOptions): any {
    const upload = multer({ dest: path.join(__dirname, options.staticAssets) });
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
    /**
     * This route should always be complete product upload.
     * Therefore it should have a unique id.
     * Check the file and database before saving.
     * If you have an error then unlink the file so you can start afresh.
     * Note: Must rename the file to match what was passed in
     */
    router.post(options.url + "/create", upload.single("file"), (req: any, res: any, next) => {
        const errorIm: string[] = [];
        let isError = false;
        if (!req.file) {
            errorIm.push("Need to upload a picture for product");
            isError = true;
        }else {
            if (!req.file.originalname.includes(".png") && !req.file.originalname.includes(".jpg")) {
                errorIm.push("Uploaded files does not have the extension png or jpeg");
                isError = true;
            }
        }
        if (!isError) {
            options.db.cr(req.body.product).then((success: string) => {
                fs.rename(path.join(__dirname, options.staticAssets, req.file.filename) , path.join(__dirname, options.staticAssets, req.file.originalname), () => null);
                res.send(success);
            }).catch((errorDb: string[]) => {
                fs.unlink(path.join(__dirname, options.staticAssets, req.file.filename), () => null);
                res.send(errorDb);
            });
        }else {
            fs.unlink(path.join(__dirname, options.staticAssets, req.file.filename), () => null);
            res.send(errorIm);
        }
    });

    router.post(options.url + "/update", (req: any, res: any, next) => {
        options.db.up(req.body.product).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });
    router.post(options.url + "/delete", (req: any, res: any, next) => {
        options.db.de(req.body.id).then((success: string) => {
            res.send(success);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });
    router.get(options.url + "/combination", (req: any, res: any, next) => {
        options.db.co().then((com: any) => {
            res.send(com);
        }).catch((err: string[]) => {
            res.send(err);
        });
    });
    router.get(options.url, (req: any, res: any, next) => {
        options.db.co().then((com: number[]) => {
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
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.production.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script>
                <script src="https://unpkg.com/@mortonprod/product-upload@1.0.3/dist/inputBuilder.min.js"></script>
                </head>
                <body>
                <div id="root"></div>
                <section>
                </section>
                <footer>
                    Product Upload component create by Alexander Morton
                </footer>
                <script>window.__COMBINATION__ = ${com}</script>
                <script src= ${options.unpkgUI}></script>
                <script type="text/babel">
                    const { InputBuilder } = productupload;
                    ReactDOM.render(
                        <InputBuilder/>,
                        document.getElementById('root')
                    );
                </script>
                </body>
                </html>
            `);
        });
    });
    return router;
}
