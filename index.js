const fs = require('fs')
const tinify = require('tinify')

tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm'

fs.readdir('./img-src', function(err, files) {
  files.shift();
  console.log(files)
  if(err) {
    return console.error(err);
  }
  fs.mkdir(__dirname + '/imgCompress/', function(err) {
      files.forEach(function(file) {
        if(fs.statSync('./img-src/' + file).isDirectory()) {
          fs.mkdir(__dirname + '/imgCompress/'+ file, function(err) {
            fs.readdir('./img-src/' + file + '/', function(err, files2) {
              if(err) {
                return console.error(err);
              }
              files2.forEach(function(file2) {
                fs.readFile('./img-src/' + file + '/' + file2, function(err, sourceData) {
                  if(err) {
                    throw err;
                  }
                  tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
                    if(err) {
                      throw err;
                    }
                    fs.writeFileSync('./imgCompress/' + file + '/' + file2, resultData);
                  });
                })
              })
            })
          });
        }else {
          fs.readFile('./img-src/' + file, function(err, sourceData) {
            if(err) {
              throw err;
            }
            tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
              if(err) {
                throw err;
              }
              fs.writeFileSync(__dirname + '/imgCompress/' + file, resultData);
            })
          })
        }
      })
    });
});


