var render = require('../render');
var db = require('../db');

function queryDB(sql) {
    return function(fn) {
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;
            fn(null, rows);                
        });
    }
}

module.exports = function *upload() {
    var sql = `SELECT * FROM files`; 
    var data = yield queryDB(sql);
    
    this.body = yield render('upload', {username: this.session.username, files: data});
};