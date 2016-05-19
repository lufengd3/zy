var parse = require('co-body');
var db = require('../../db');

module.exports = function *(ctx) {
    var data = yield parse(ctx);
    var sql = `DELETE FROM files WHERE id='${data.id}'`;
    
    yield new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) throw err;
            
            ctx.body = {status: 'sucess'};
            resolve();
        });        
    })
}