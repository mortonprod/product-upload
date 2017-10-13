const scrape = require('website-scraper');
const {parseHTML} = require('./parseHTML');
const fs = require('fs');

const directory = "./annsummers"; 
const outputFile = "./data.json";
/**
 * Use the sitemap to go to categories and then take the first items there.
 * After we get the website parse all html files and produce json file which with links to static assets.
 * Each file should be parsed asynchronously with fs.
 * Check if directory exists so we don't scrape each time.
 * Also check if json exists so we don't have to recalculate each time.
 * DELETE DIRECTORY TO RESCRAPE.
 */ 
fs.stat(outputFile, function(err,json) {
  if(err == null || err == false){
    console.log("FILE EXISTS. Delete " + outputFile  + " if you need to rerun.")
  }else{
    fs.stat(directory+'/', function(err,stat) { 
      console.log("Err: " + err);
      if(err == null || err == false){
        parseHTML(directory).then((result) => {
          removeEmptyAndSave(result);      
        });
      }else{
        scrape({
          urls: ['http://www.annsummers.com/sitemap'],
          directory: directory,
          sources: [
            {selector: 'img', attr: 'src'}
          ],
          recursive: true,
          maxRecursiveDepth: 1,
        }).then(()=>{
          parseHTML(directory).then((result) => {
            removeEmptyAndSave(result);
          });
        }).catch(console.log);
      }
    });
  }
});
/**
 * Must exit the process since promise does not finish.
 */
function removeEmptyAndSave(result){
  fs.writeFile(outputFile, JSON.stringify(result),(err)=>{
    if(!err){
      console.log("JSON SAVED TO " + outputFile + " FILE BELOW");
      console.log(result);
      process.exit(0);
    }else{
      console.log("Didn't save file. Error: " + err);
      process.exit(1);
    }
  }); 
}