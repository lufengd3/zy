var path = require('path');
var parse = require('co-body');
var db = require('../../db');
var baseDir = require('../../config').baseDir;
var exec = require('child_process').exec;
var spawnSync = require('child_process').spawnSync;

function queryDB(sql) {
    return function(fn) {
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;
            fn(null, rows);                
        });
    }
}

function execCmd(cmd) {
    return function (fn) {
      exec(cmd, (err, stdout, stderr) => {
        var data = {
            time: stdout,
            error: stderr
        }
        
        fn(null, data);
      });
        
    }
}

module.exports = function *(ctx) {
    var username = ctx.session.username;
    var data = yield parse(ctx);
    var fileSql = `SELECT file_dir, file_name FROM files WHERE id='${data.id}'`;
    var userSql = `SELECT user_attr FROM users WHERE username='${username}'`;
    
    var fileData = yield queryDB(fileSql);
    var userData = yield queryDB(userSql);
    
    var fileName = fileData[0]['file_name'];
    var fileDir = fileData[0]['file_dir'];
    fileDir = path.join(baseDir, fileDir)
    
    var attrTree = unescape(userData[0]['user_attr']);
    
    var randomStr = String(Math.random()).slice('2');
    var userKeyName = `user_key_${randomStr}`;
    var userKeyDir = path.join('/tmp', userKeyName);
    var pubKeyDir = path.join(fileDir, 'pub_key');
    var masterKeyDir = path.join(fileDir, 'master_key');
    var tmpFileDir = path.join('/tmp', fileName);
    var originFileDir = path.join(fileDir, fileName);
    
    var cpCmd = `cp ${originFileDir} ${tmpFileDir}`;
    var keygenCmd = `cpabe-keygen -o ${userKeyDir} ${pubKeyDir} ${masterKeyDir} ${attrTree}`;
    var decCmd = `cpabe-dec ${pubKeyDir} ${userKeyDir} ${tmpFileDir}`; 
    
    yield execCmd(keygenCmd);
    yield execCmd(cpCmd);
    ctx.body = yield execCmd(decCmd);
     
}