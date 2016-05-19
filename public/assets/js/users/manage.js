$(document).ready(function() {
    var delBtn = $('.del-user');
    var userTable = $('.user-table');

    delBtn.on('click', function(e) {
        var uid = $(this).attr('uid');
        var userItem = $(this).parents('tr');
        var userBackUp = userItem.clone();
        
        userItem.remove();
        
        $.post('/users/delete/', {id: uid})
            .done(function(data) {
                // console.log('success ' + data.status);
            })
            .fail(function(err) {
                alert('服务器发生错误.');
                userBackUp.appendTo('.user-table tbody');
            })
    });
});