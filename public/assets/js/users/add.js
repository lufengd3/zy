$(document).ready(function() {
    $('.add-user-form select').material_select();
    
    var submitBtn = $('.add-user-form .add-user-submit');
    var formInputs = $('.add-user-form .user-data');
    var updateBtn = $('.update-user');
    var delBtn = $('.del-user');

    document.onkeyup = changeSubmitStatus; 
    $('.add-user-form select').change(changeSubmitStatus);
    
    function changeSubmitStatus() {
        var empty = false;

        formInputs.each(function(index, elm) {
            if (!elm.value) {
                empty = true;
            }
        });

        if (empty) {
            submitBtn.attr('disabled', 'disabled');
            submitBtn.addClass('disabled');            
        } else {
            submitBtn.removeAttr('disabled');
            submitBtn.removeClass('disabled');
        }
    }
    
});