var parse = require('co-body');
var render = require('../render');
var db = require('../db');

module.exports = function *loginValidate() {
    var loginData = yield parse(this);
    var sql = `SELECT COUNT(*) FROM users WHERE username='${loginData.username}'
               AND password='${loginData.password}'`;
    
    yield new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) throw err;
            
            if (rows[0]['COUNT(*)']) {
                this.session.username = loginData.username;
                this.body = {status: 'success'};
            } else {
                this.body = {status: 'fail'};
            }
            resolve(); 
        });
    });
}