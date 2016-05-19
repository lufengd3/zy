var render = require('../render');

function *login() {
    if (this.session.username) {
        this.redirect('/files/list');
    } else {
        this.body = yield render('login');
    }
}

module.exports = login;

