var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var Index = require('../controllers/index');

router.use(User.localsUser);

/* images */
router.get('/', Index.showIndex);
router.get('/my', User.signinRequired, Index.showMy);
router.post('/upload', User.signinRequired, Index.uploadFile, Index.saveImage);
router.post('/photo/del',User.signinRequired, Index.delImage);

/* user */
router.get('/signin', User.noSigninRequired, User.showSignin);
router.get('/signup', User.noSigninRequired, User.showSignup);
router.post('/signup', User.signup);
router.post('/signin', User.signin);
router.get('/check-name', User.checkName);
router.get('/logout', User.logout);



module.exports = router;
