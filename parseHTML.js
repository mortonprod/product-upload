const fs = require('fs');
const glob = require('glob');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Resolve promises for each file and js object in that file.
 */
exports.parseHTML = (directory, jsObjects) => {
    getItems(directory,jsObjects).then(values => { 
        console.log("GOT ALL JS OBJECT...");
        console.log(JSON.stringify(values));
    });

}
/**
 * Will only resolve when we have all the files and js objects processed.
 */
function getItems(directory,jsObjects){
    return new Promise((resolve,reject) => {
        info = []
        glob(directory + "/*.html", {}, function (er, files) {
            files.forEach((file)=>{
                fs.readFile(file,'utf8', function (err, data) {
                    if (err) throw err;
                    jsObjects.forEach((el)=>{
                        const dom = new JSDOM(data,{ runScripts: "dangerously" });
                        if(dom.window && dom.window[el] && Array.isArray(dom.window[el])){
                            createFinalJson(file,el,dom.window[el],directory).then((result)=>{
                                console.log("result: " + result)
                                info.push(result);
                                console.log(file + " " + files[files.length-1] + " " + el + " "+ jsObjects[jsObjects.length-1]);                                
                                if(file === files[files.length-1]  && el === jsObjects[jsObjects.length-1]){
                                    console.log('FOUND ALL');
                                    resolve(info);
                                }else{
                                    console.log("still more to find.");
                                }   
                            }).catch((err)=>{
                                console.log(err);
                            })
                        }    
                    }); 
                });
            });
        });
    });
}

/**
 * This will take in the items for each page. 
 * It will remove the entries we don't want and make sure we point to the correct image.
 * It will only return when all the items for a page has been updated.
 */
function createFinalJson(file,name,items,directory) {
    return Promise.all(
        items.map((el)=>{
            return new Promise((resolve,reject) => {
                const item = JSON.parse(JSON.stringify(el));
                delete item.url
                const images = directory + "/*"+item.sku_code+"*";
                //const images = directory + "/*("+item.sku_code+")";        
                console.log(images); 
                glob(images, {}, function (er, files) {
                    console.log("In glob");
                    if(files.length > 1){
                        reject("Found more than one picture for the item.")
                    }else{
                        item.pic = files[0];
                        resolve({file:file,name:name,item:item});
                    }
                })
            }); 
        })
    );
}