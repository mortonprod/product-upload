const fs = require('fs');
const glob = require('glob');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {  });
virtualConsole.on("warn", () => {  });
virtualConsole.on("info", () => {  });
virtualConsole.on("dir", () => {  });

/**
 * This will take in all html files in a directory.
 * In each file it will look for a jsObject called items.
 * If it finds it, then it will create the final json we need.
 * When we have looked through all the files we resolve and pass the result.
 * Note the final output should a single array with every product. 
 * This is done to keep the input to the application as generic as possible.
 */
exports.parseHTML = (directory) => {
    return new Promise((resolve,reject) => {
        info = []
        glob(directory + "/*.html", {}, function (er, files) {
            files.forEach((file)=>{
                fs.readFile(file,'utf8', function (err, data) {
                    if (err) throw err;
                    const dom = new JSDOM(data,{ runScripts: "dangerously",virtualConsole});
                    if(dom.window && dom.window["items"] && Array.isArray(dom.window["items"])){
                        createFinalJson(dom.window["items"],directory).then((result)=>{
                            console.log("Push items for " + file);
                            info = info.concat(result);                               
                            if(file === files[files.length-1]){
                                console.log('FOUND ALL');
                                resolve(info);
                            }else{
                                console.log("Still more to find after " + file);
                            }   
                        }).catch((err)=>{//Must also check if we have reached the end due to an error
                            console.log("Error form items: " + err);
                            if(file === files[files.length-1]){
                                console.log('FOUND ALL');
                                resolve(info);
                            }else{
                                console.log("Still more to find after " + file);
                            }  
                        })
                    }else{
                        console.log("No items found.");
                        if(file === files[files.length-1]){
                            console.log('FOUND ALL');
                            resolve(info);
                        }else{
                            console.log("still more to find after " + file);
                        }  
                    }    
                });
            });
        });
    });
}

/**
 * This will take in the items object for each page. 
 * It will remove the entries we don't want and make sure we point to the correct image.
 * This is done to format the json for mongodb saving.
 * It will only return when all the items for a page has been updated.
 * NOTE: MONGODB EXPECTS _ID TO BE OF A PARTICULAR LENGTH SO IGNORE THIS
 */
function createFinalJson(items,directory) {
    return Promise.all(
        items.map((el)=>{
            return new Promise((resolve,reject) => {
                const item = JSON.parse(JSON.stringify(el));
                delete item.url
                //item._id = item.id;
                //delete item.id;
                const images = directory + "/*"+item.sku_code+"*";
                //const images = directory + "/*("+item.sku_code+")";        
                glob(images, {}, function (er, files) {
                    console.log("Looking for images using sku code...");
                    console.log("Found: " + files + " which match the code. ");                    
                    if(files.length > 1){
                        reject("Found more than one picture for the item.")
                    }else{
                        item.pic = files[0];
                        resolve(item);
                    }
                })
            }); 
        })
    );
}