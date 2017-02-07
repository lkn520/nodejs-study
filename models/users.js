/**
 * Created by Administrator on 2017/1/21/0021.
 */
var mongoose = require('mongoose');
var schema = require('../schemas/users');
var User = mongoose.model('User', schema);

module.exports = User;