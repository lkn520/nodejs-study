/**
 * Created by Administrator on 2017/1/25/0025.
 */
var mongoose = require('mongoose');
var schema = require('../schemas/images');
var Image = mongoose.model('Images', schema);

module.exports = Image;