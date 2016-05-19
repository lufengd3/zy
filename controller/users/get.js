var manageUser = require('./manage');
var addUser = require('./add');


function queryDB(sql) {
    return function(fn) {
        db.query(sql, function(err, rows, fields) {
            if (err) throw err;
            fn(null, rows);                
        });
    }
}

module.exports = function *(action) {
    switch(action) {
        case 'manage':
            yield manageUser(this);
            break;
        case 'add':
            yield addUser(this);
            break;
        default:
            break;
    }
}