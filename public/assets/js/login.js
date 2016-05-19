$(function() {
   var loginBtn = $('.login-form .login-submit');
   var formInputs = $('.login-form input'); 
   
   document.onkeyup = function() {
        var empty = false;
    
        formInputs.each(function(index, elm) {
            empty = (elm.value ? false : true);
        });

        if (empty) {
            loginBtn.attr('disabled', 'disabled');
            loginBtn.addClass('disabled');            
        } else {
            loginBtn.removeAttr('disabled');
            loginBtn.removeClass('disabled');
        }
   }
   
   loginBtn.on('click', function(e) {
       e.preventDefault();
       var username = $('.login-form #username').val();
       var password = $('.login-form #password').val();
       
       $.post('/login', {username: username, password: password})
             .done(function(data) {
                 if (data.status === 'success') {
                     location.href = '/files/list';
                 } else {
                     alert('用户名或密码错误');
                 }
             })
             .fail(function(err) {
                 console.log(err);
             })
   })
    
});