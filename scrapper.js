var scrape = require('website-scraper');
/**
 * Use the sitemap to go to categories and then take the first items there.
 */
 scrape({
    urls: ['http://www.annsummers.com/sitemap'],
    directory: './annsummers',
    sources: [
      {selector: 'img', attr: 'src'}
    ],
    recursive: true,
    maxRecursiveDepth: 1,
    //maxDepth: 2
  }).then(console.log).catch(console.log);