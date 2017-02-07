/**
 * Created by Administrator on 2017/1/21/0021.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    meta: {
        create_at: {
            type: Date,
            default: Date.now()
        },
        update_at: {
            type: Date,
            default: Date.now()
        }
    }
});

//中间件
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});

//静态方法
UserSchema.statics = {

};

//实例方法
UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err);

            cb(null, isMatch);
        });
    }
};

module.exports = UserSchema;