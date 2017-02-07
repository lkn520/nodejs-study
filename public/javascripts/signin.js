/**
 * Created by Administrator on 2017/1/21/0021.
 */
$(function() {
    $('#signin-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 12
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 32
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(r) {
                    if (r.code !== 0) {
                        $('#success-collapse').collapse('show');
                    }else {
                        location.href = "/";
                    }
                }
            })
        },
        errorClass: 'help-block text-danger',
        debug: true
    });
    $('#signin-form').find('input').tooltip({
        container: 'body',
        trigger: 'focus'
    });
});