var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');
var db = require('../../db');
var exec = require('child_process').exec;
var spawnSync = require('child_process').spawnSync;
var moment = require('moment');
var baseDir = require('../../config').baseDir;

function *handleUpload(ctx) {
  var dateTime = moment().format('YYYYMMDDHHmmss');
  var randomStr = String(Math.random()).slice('2');
  var tmpFilePath = path.join('/tmp', randomStr);

  var parts = parse(ctx, {autoFields: true});
  var part, fileName;
  
  while (part = yield parts) {
    part.pipe(fs.createWriteStream(tmpFilePath));  
  
    fileName = dateTime + '-' + part.filename;
  }
  
  var fileDirName = randomStr;
  var fileDir = path.join(baseDir, fileDirName);
  var filePath = path.join(fileDir, fileName);
  var attrTree = parts.field["attr-tree"];
  
  fs.mkdirSync(fileDir);
  fs.renameSync(tmpFilePath, filePath);
  
  try {
    process.chdir(fileDir);
    spawnSync('cpabe-setup');
  }
  catch (err) {
    console.log('chdir: ' + err);
  }
      
  yield new Promise((resolve, reject) => {
      var cmd = `cpabe-enc pub_key ${filePath} '${attrTree}'`;
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          throw err;
        } 
        
        fileName += '.cpabe';
        filePath += '.cpabe';
        
        var encTime = stdout;
        var escapedAttr = escape(attrTree);
        
        var sql = `INSERT INTO files VALUES ('', '${fileDirName}', '${fileName}', '${encTime}',
                  '-', now(), '${escapedAttr}', '${getFilesizeInKB(filePath)}')`;
        
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

function *handleForm(ctx, tmpFilePath) {
  // return new Promise((resolve, reject) => {
  //   var parts = parse(ctx, {autoFields: true});
  //   var part;
    
  //   while (part = yield parts) {
  //     part.pipe(fs.createWriteStream(tmpFilePath));  
  //   }
    
  //   return {part: part, parts: parts};
  // })
}
module.exports = handleUpload;
