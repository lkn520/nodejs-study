/**
 * Created by Administrator on 2017/2/2/0002.
 */
$(function() {
    'use strict';

    $('#upload-form').validate({
        rules: {
          file: {
              required: true
          }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(r) {
                    if (r.code === 0) {
                        alert(r.message);
                        history.go(0);
                    }
                }
            })
        }
    });

    $('#del-form').validate({
       submitHandler: function(form) {
           $(form).ajaxSubmit({
               success: function(r) {
                   if (r.code === 0) {
                       alert(r.message);
                       history.go(0);
                   }
               }
           })
       }
    });

    $('#myModel').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var _id = button.data('id');

        var modal = $(this);
        modal.find('.modal-footer input').val(_id);
    });
});