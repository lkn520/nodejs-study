/**
 * Created by Administrator on 2017/1/25/0025.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var Image = mongoose.model('Images');
var utlis = require('../public/javascripts/utils')(global);
var r = require('../response.json');

exports.showIndex = function(req, res, next) {
    Image.find()
        .sort({'meta.create_at': -1})
        .populate('creator', 'name')
        .exec(function(err, images) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'Express',
            cssPath: 'index',
            jsPath: 'index',
            active: 'index',
            images: images
        });
    });
};

exports.showMy = function(req, res, next) {
    var user_id = req.session.user._id;
    Image.find({creator: user_id})
        .sort({'meta.create_at': -1})
        .populate('creator', 'name')
        .exec(function(err, images) {
            if (err) {
                console.log(err);
            }
            res.render('my', {
                title: 'my',
                cssPath: 'index',
                jsPath: 'my',
                active: 'my',
                images: images
            })
        })
};

exports.uploadFile = function(req, res, next) {
    var files = req.files.file;
    var filesPath = files.path;

    fs.readFile(filesPath, function(err, data) {
        if (err) {
            console.log(err)
        }
        var timestamp = Date.now();
        var type = files.type.split('/')[1];
        var newName = timestamp + '.' + type;
        var newPath = path.join(__dirname, '../', '/public/upload/'+newName);

        fs.writeFile(newPath, data, function(err) {
            req.files.name = newName;
            req.files.type = files.type;
            next();
        });
    })
};

exports.saveImage = function(req, res, next) {
    var imgObj = {
        name: req.files.name,
        type: req.files.type,
        creator: req.body.creator
    };
    var _image = new Image(imgObj);
    _image.save(function(err, image) {
        res.send(utlis.resSend(r.uploadImage.code, r.uploadImage.message, image));
    });
};

exports.delImage = function(req, res, next) {
    var _id = req.body._id;
    Image.remove({_id: _id, creator: req.session.user._id}, function(err) {
        if (err) {
            console.log(err)
        }
        res.send(utils.resSend(r.deleteImage.code, r.deleteImage.message, {}));
    })
};
