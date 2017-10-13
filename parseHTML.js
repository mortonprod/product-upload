const fs = require('fs');
const glob = require('glob');

/**
 * Go through all html files in a directory.
 * In each file go through a series of search strings.
 */
exports.parseHTML = (directory, searchStrings) => {
    glob(directory + "/*.html", {}, function (er, files) {
        files.forEach((file)=>{
          fs.readFile(file, function (err, data) {
            if (err) throw err;
            searchStrings.forEach((el)=>{
                if(data.indexOf(el.name) >= 0){
                    const index = data.indexOf(el.name);
                    console.log(el.name + " index: " + index);
                    //data.splice();
                    console.log(data.toString('utf8'))
                }
            });
          });
        });
      });
}