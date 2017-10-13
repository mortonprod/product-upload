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
const searchStrings = [
  {
    name: 'var items =',
    delimiter:',',
    value: null
  }
]
fs.exists(directory+'/*', function(err,stat) { 
  console.log("Err: " + err);
  if(err == null || err == false){
    parseHTML(directory,searchStrings);
  }else{
    scrape({
      urls: ['http://www.annsummers.com/sitemap'],
      directory: directory,
      sources: [
        {selector: 'img', attr: 'src'}
      ],
      recursive: true,
      maxRecursiveDepth: 1,
      //maxDepth: 2
    }).then(()=>{
      parseHTML(directory,searchStrings);
    }).catch(console.log);
  }
});