/**
 * Created by Administrator on 2017/1/21/0021.
 */
$(function() {
    $('#signup-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 12,
                remote: '/check-name'
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 32
            },
            password2: {
                required: true,
                minlength: 6,
                maxlength: 32,
                equalTo: '[name="password"]'
            }
        },
        messages: {
            name: {
                remote: '用户名已存在'
            },
            password2: {
                equalTo: '你两次输入的密码不一致'
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(r) {
                    if (r.code === 0) {
                        $('#success-collapse').collapse('show');
                    }else {
                        console.log(r.message);
                    }
                },
                resetForm: true
            })
        },
        debug: false,
        errorClass: 'help-block text-danger'
    });
    $('#signup-form').find('input').tooltip({
        container: 'body',
        trigger: 'focus'
    });
});