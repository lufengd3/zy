var manageFile = require('./manage');
var uploadFile = require('./upload');

module.exports = function *(action) {
    switch(action) {
        case 'list':
            yield manageFile(this);
            break;
        case 'upload':
            yield uploadFile(this);
            break;
        default:
            break;
    }
}