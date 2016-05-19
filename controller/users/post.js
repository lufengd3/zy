var handleAdd = require('./handle-add');
var delUser = require('./delete');

module.exports = function *(action) {
    if (this.session.username !== 'admin') {
        this.status = 403;
        this.redirect('/');
    }

    switch(action) {
        case 'add':
            yield handleAdd(this);
            break;
        case 'delete':
            yield delUser(this);        
            break;
        case 'update':
            yield updateUser(this);
            break;
        default:
            break;
    }
}
