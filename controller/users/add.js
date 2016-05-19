var render = require('../../render');

module.exports = function *(ctx) {
    ctx.body = yield render('users/add', {username: ctx.session.username});
}