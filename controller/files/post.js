var handleUpload = require('./handle-upload');
var delFile = require('./delete');

module.exports = function *(action) {
    if (this.session.username !== 'admin') {
        this.status = 403;
        this.redirect('/');
    }

    switch(action) {
        case 'upload':
            yield handleUpload(this);
            break;
        case 'delete':
            yield delFile(this);        
            break;
        default:
            break;
    }
}