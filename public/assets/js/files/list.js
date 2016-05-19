$(document).ready(function() { 
    var fileTable = $('.file-list');
    var checkAll = $('#check-all');
    var childCheckBox = fileTable.find('tbody input[type="checkbox"]');
    var delBtn = $('.del-file');
    var decBtn = $('.dec-file');
    
    checkAll.on('click', function(e) {
        if (!checkAll.prop('checked')) {
            childCheckBox.prop('checked', false);
        } else {
            childCheckBox.prop('checked', true);
        }
        
    });
    
    childCheckBox.on('click', function() {
        if (!$(this).prop('checked')) {
            $(this).prop('checked', false);
        } else {
            $(this).prop('checked', true);
        }
        
        // 取消checkall
        if (checkAll.prop('checked')) {
            checkAll.prop('checked', false);
        }
    });
    
    delBtn.on('click', function(e) {
        var id = $(this).attr('file-id');
        var item = $(this).parents('tr');
        var itemBackUp = item.clone();
        
        item.remove();
        
        $.post('/files/delete/', {id: id})
            .done(function(data) {
                // console.log('success ' + data.status);
            })
            .fail(function(err) {
                alert('服务器发生错误.');
                itemBackUp.appendTo('.file-list tbody');
            })
    });
    
    decBtn.on('click', function(e) {
        var id = $(this).attr('file-id');
        $.post('/files/dec/', {id: id})
            .done(function(data) {
                // console.log('success ' + data.status);
            })
            .fail(function(err) {
                alert('服务器发生错误.');
            })
    })

});