const express    =  require ('express')
const sequelize  =  require('sequelize')
const passport   = require('passport');
const session    =  require('express-session')
const router = express.Router()
const Strategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-facebook').Strategy;

router.route('/')
 	.get((req,res) => {
 		res.render('index')
  		}
	);

router.route('/index')
 	.get((req,res) => {
 		res.render('index')
  		}
	);
router.route('/profile')
 	.get((req,res) => {
 		res.render('profile')
  		}
	);


router.route('/register')
	.get((req,res)=> {
		res.render('register')
	})
	.post(passport.authenticate());


router.route('/login')
  .post(passport.authenticate( { successRedirect: '/profile',
                                   		failureRedirect: '/index',
                                   		failureFlash: true })
);

router.route('/auth/facebook')
	.get(passport.authenticate('facebook', {scope: ['public_profile', 'email']}))
<<<<<<< 8bc0821107e9c91841d740fc3b9977955c617d8f
=======

>>>>>>> Sloppily added work

router.route('/auth/facebook/callback')
	.get(passport.authenticate('facebook', {
		successRedirect: '/home',
		failureRedirect: '/index'
	}))

router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

router.route('/faq')
	.get((req, res) => {
		res.render('faq')
	})


module.exports = router

