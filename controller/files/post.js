var handleUpload = require('./handle-upload');
var delFile = require('./delete');
var decFile = require('./dec');

module.exports = function *(action) {
    switch(action) {
        case 'upload':
            yield handleUpload(this);
            break;
        case 'delete':
            yield delFile(this);        
            break;
        case 'dec':
            yield decFile(this);        
            break;
        default:
            break;
    }
}