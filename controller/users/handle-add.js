var parse = require('co-body');
var db = require('../../db');

module.exports = function *(ctx) {
    var formData = yield parse(ctx);
    var sql = `INSERT INTO users VALUES('', '${formData.username}', '${formData.password}', '${formData.user_group}', now())`;
    
    yield new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) throw err;
            
            ctx.redirect('/users/manage');
            resolve(); 
        });
    });
}

