var render = require('../../render');
var db = require('../../db');

function queryDB(sql) {
    return function(fn) {
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;
            fn(null, rows);                
        });
    }
}

module.exports = function *(ctx) {
    var sql = `SELECT * FROM files`; 
    var data = yield queryDB(sql);
    
    ctx.body = yield render('files/list', {username: ctx.session.username, files: data});
};