$(function(){
    var uploadForm = $('.upload-form');
    var fileInput = $('.upload-form input[type="file"]');
    var submitBtn = $('.upload-form button[type="submit"]');
    var attrTree = $('#attr-tree');
    
    fileInput.on('change', function() {
        if (submitBtn.hasClass('disabled')) {
            submitBtn.removeClass('disabled');
            submitBtn.removeAttr('disabled');
        }    
    })
    
    submitBtn.on('click', function(e) {
        e.preventDefault();
        if (attrTree.val()) {
            uploadForm.submit();
            submitBtn.attr('disabled', 'disabled');
            submitBtn.text('上传中...');    
        } else {
            alert('请填写属性');
        }
    })
});
