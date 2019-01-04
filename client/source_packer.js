var fs = require('fs');
var { fileList, libList } = require('./all_file_list');

function combineSource(fileList, filename) {
    var sourceStr = '';
    fileList.forEach(src => {
        sourceStr += fs.readFileSync(__dirname + '/' + src, { encoding: 'utf-8' });
        sourceStr += '\n \n \n';
    });

    fs.writeFile(filename, sourceStr, { encoding: "utf-8" }, function (err, res) {
        if (err)
            console.err(err);
        else
            console.log('Done!');
    });
}

combineSource(fileList, './source_combine.js');
combineSource(libList, './lib.js');