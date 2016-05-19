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
    var sql = `SELECT id, username, user_attr, create_date FROM users`;
    var users = yield queryDB(sql);
    
    ctx.body = yield render('users/list', {username: ctx.session.username, users: users});
}