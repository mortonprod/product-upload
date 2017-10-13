const scrape = require('website-scraper');
const {parseHTML} = require('./parseHTML');
const fs = require('fs');
/**
 * Use the sitemap to go to categories and then take the first items there.
 * After we get the website parse all html files and produce json file which with links to static assets.
 * Each file should be parsed asynchronously with fs.
 * Check if directory exists so we don't scrape each time.
 * DELETE DIRECTORY TO RESCRAPE.
 */ 
const directory = "./annsummers"; 
const jsObjects = ['items'];
fs.exists(directory+'/*', function(err,stat) { 
  console.log("Err: " + err);
  if(err == null || err == false){
    parseHTML(directory,jsObjects);
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
      parseHTML(directory,jsObjects);
    }).catch(console.log);
  }
});