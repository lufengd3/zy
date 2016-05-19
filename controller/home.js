var render = require('../render');

module.exports = function *() {
    if (this.session.username) {
        // this.body = yield render('index', {username: this.session.username});
        this.redirect('/files/list');
    } else {
        this.redirect('/login');
    }
}