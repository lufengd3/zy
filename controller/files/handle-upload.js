var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');
var db = require('../../db');
var exec = require('child_process').exec;
var spawnSync = require('child_process').spawnSync;
var moment = require('moment');
var baseDir = require('../../config').baseDir;

function *handleUpload(ctx) {
  var parts = parse(ctx, {autoFields: true});
  var part = yield parts;
  var dateTime = moment().format('YYYYMMDDHHmmss');
  var fileName = dateTime + '-' + part.filename;
  var fileDirName = String(Math.random()).slice('2');
  var fileDir = path.join(baseDir, fileDirName);
  var filePath = path.join(fileDir, fileName);
  
  fs.mkdirSync(fileDir);
  part.pipe(fs.createWriteStream(filePath));  
  
  try {
    process.chdir(fileDir);
    spawnSync('cpabe-setup');
  }
  catch (err) {
    console.log('chdir: ' + err);
  }
  
  yield new Promise((resolve, reject) => {
    exec(`cpabe-enc pub_key ${filePath} '${parts.field["attr-tree"]}'`, (err, stdout, stderr) => {
      if (err) {
        throw err;
      } 
      
      var encTime = stdout;
      
      fileName += '.cpabe';
      filePath += '.cpabe';
      
      var sql = `INSERT INTO files VALUES ('', '${fileDirName}', '${fileName}', '${encTime}',
                '-', now(), '${parts.field["attr-tree"]}', '${getFilesizeInKB(filePath)}')`;
      
      db.query(sql, (err, rows, fields) => {
          if (err) throw err;

          ctx.redirect('/files/list');
          resolve();
      });
    });
  });
    
}

function getFilesizeInKB(filename) {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats["size"]
  var size = Math.ceil(fileSizeInBytes / 1024) + 'KB';
  
  return size;
}

module.exports = handleUpload;
