var parse = require('co-body');
var db = require('../../db');

module.exports = function *(ctx) {
    var formData = yield parse(ctx);
    var attr = escape(formData['user-attr']);
    var sql = `INSERT INTO users VALUES('', '${formData.username}', '${formData.password}', '${attr}', now())`;
    
    yield new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) throw err;
            
            ctx.redirect('/users/manage');
            resolve(); 
        });
    });
}

