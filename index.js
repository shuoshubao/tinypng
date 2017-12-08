const fs = require('fs')
const tinify = require('tinify')

tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm'

fs.readdir('./img/src', function(err, files) {
  files.shift();
  console.log(files)
  if(err) {
    return console.error(err);
  }
  files.forEach(function(file) {
    if(fs.statSync('./img/' + file).isDirectory()) {
      fs.readdir('./img/' + file + '/', function(err, files2) {
        if(err) {
          return console.error(err);
        }
        files2.forEach(function(file2) {
          fs.readFile('./img/' + file + '/' + file2, function(err, sourceData) {
            if(err) {
              throw err;
            }
            tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
              if(err) {
                throw err;
              }
              fs.open('./img2/' + file + '/' + file2, 'w', function(err) {
                if (err) {
                  return console.error(err);
                }
                fs.writeFileSync('./img2/' + file + '/' + file2, resultData);
                console.log('创建成功！')
              });
            });
          })
        })
      })
    }else {
      fs.readFile('./img/' + file, function(err, sourceData) {
        if(err) {
          throw err;
        }
        tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
          if(err) {
            throw err;
          }
          fs.open('./img2/'+ file, 'w', function(err) {
            if (err) {
              return console.error(err);
            }
            fs.writeFileSync('./img2/'+ file, resultData);
            console.log('创建成功！')
          });
        })
      })
    }
  })
});


