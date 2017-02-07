/**
 * Created by Administrator on 2017/1/21/0021.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../public/javascripts/utils')(global);
var r = require('../response.json');

exports.showSignup = function(req, res, next) {
    res.render('signup', {
        title: 'signup',
        cssPath: 'signin',
        jsPath: 'signup'
    })
};

exports.showSignin = function(req, res, next) {
    res.render('signin', {
        title: 'signin',
        cssPath: 'signin',
        jsPath: 'signin'
    })
};

exports.signup = function(req, res, next) {
    var _user = req.body;
    User.findOne({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            console.log('用户已存在');
            return res.redirect('/signup');
        }else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.send(utils.resSend(r.signup.code, r.signup.message, user));
            })
        }
    });
};

exports.signin = function(req, res, next) {
    var _user = req.body;
    User.findOne({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            console.log('账号不存在');
            return res.send(utils.resSend(r.nameError.code, r.nameError.message, null));
        }

        user.comparePassword(_user.password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                console.log('账号密码正确');
                req.session.user = user;
                return res.send(utils.resSend(r.signin.code, r.signin.message, user));
                //return res.redirect('/');
            }else {
                console.log('密码错误');
                return res.send(utils.resSend(r.passwordError.code, r.passwordError.message, null));
            }
        });
    });
};

exports.checkName = function(req, res, next) {
    User.findOne({name: req.query.name}, function(err, user) {
        if (err) {
            console.log(err)
        }
        return res.send(!user)
    });
};

exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }
    next();
};

exports.noSigninRequired = function(req, res, next) {
    var user = req.session.user;
    if (user) {
        return res.redirect('/');
    }
    next();
};

exports.logout = function(req, res, next) {
    delete req.session.user;
    return res.redirect('/');
};

exports.localsUser = function(req, res, next) {
    var user = req.session.user;
    if (user) {
        res.locals.user = user;
    }
    next();
};