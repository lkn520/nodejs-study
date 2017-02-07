/**
 * Created by Administrator on 2017/1/23/0023.
 */
(function(global, factory) {
    "use strict";
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                return factory(w)
            }
    }else {
        factory(global)
    }
})(typeof window !== 'undefined' ? window : this, function(window, noGloabl) {
    "use strict";

    var utils =  {};

    utils.resSend = function(code, message, data) {
        return {
            code : code,
            message : message,
            data : data
        }
    };

    if (!noGloabl) {
        window.utils = utils;
    }

    return utils;
});