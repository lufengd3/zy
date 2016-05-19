var render = require('../../render');

module.exports = function *(ctx) {    
    ctx.body = yield render('files/upload', {username: ctx.session.username});
};