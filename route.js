var route = require('koa-route');
var home = require('./controller/home');
var login = require('./controller/login');
var loginValidate = require('./controller/login-validate');
var logout = require('./controller/logout');
var usersGetReq = require('./controller/users/get');
var usersPostReq = require('./controller/users/post');
var filesGetReq = require('./controller/files/get');
var filesPostReq = require('./controller/files/post');

function router(app) {
    app.use(route.get('/', home));
    app.use(route.get('/files/:action', filesGetReq));
    app.use(route.post('/files/:action', filesPostReq));
    app.use(route.get('/login', login));
    app.use(route.post('/login', loginValidate));
    app.use(route.get('/logout', logout));
    app.use(route.get('/users/:action', usersGetReq));
    app.use(route.post('/users/:action', usersPostReq));
    
    // custom 404
    app.use(function *(next){
        yield next;
        if (this.body || !this.idempotent) return;
        this.redirect('/public/404.html');
    });
}

module.exports = router;
