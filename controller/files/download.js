var fs = require('fs');
var path = require('path');
var db = require('../../db');

function queryDB(sql) {
    return function(fn) {
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;
            fn(null, rows);                
        });
    }
}

module.exports = function *(id) {
    var sql = `SELECT file_name FROM files WHERE id='${id}'`; 
    var data = yield queryDB(sql);
    var fileName = data[0]['file_name'].slice(0, -6);
    var filePath = path.join('/tmp', fileName);
    // this.body = 'hello ' + filePath;    
    this.type = "image/*";
    this.body = fs.createReadStream(filePath);
};