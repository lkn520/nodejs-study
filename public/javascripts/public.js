/**
 * Created by Administrator on 2017/1/22/0022.
 */
$(function() {
    'use strict';

    lightbox.option({
        'resizeDuration': 400,
        'wrapAround': true,
        'albumLabel': 'Image %1 / %2',
        'showImageNumberLabel': true,
        'alwaysShowNavOnTouchDevices': false
    });

    $('.lazy').lazyload({
        effect: 'fadeIn'
    });
});