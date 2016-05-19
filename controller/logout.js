module.exports = function *() {
    delete this.session.username;
    this.redirect('/');
}