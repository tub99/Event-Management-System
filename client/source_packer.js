var fs = require('fs');
var { fileList, libList, styleList } = require('./all_file_list');

function combineSource(fileList, filename, message) {
    var sourceStr = '';
    fileList.forEach(src => {
        sourceStr += fs.readFileSync(__dirname + '/' + src, { encoding: 'utf-8' });
        sourceStr += '\n \n \n';
    });

    fs.writeFile(filename, sourceStr, { encoding: "utf-8" }, function (err, res) {
        if (err)
            console.err(err);
        else
            console.log(message + ' Done!');
    });
}

combineSource(fileList, './source_combine.js', 'source combine');
combineSource(libList, './lib.js', 'libs combine');
combineSource(styleList, './styles.css', 'styles combine');