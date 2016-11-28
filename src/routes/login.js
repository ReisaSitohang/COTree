const express    =  require ('express')
const sequelize  =  require('sequelize')
const passport   = require('passport');
const session    =  require('express-session')
const router = express.Router()
const Strategy = require('passport-facebook').Strategy;

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

router.route('/login')
 	.get((req,res) => {
 		res.render('index')
  		}
	);

router.route('/auth/facebook')
	.get(passport.authenticate('facebook'))

router.route('/auth/facebook/callback')
	.get(passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/index'
	}))

router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

module.exports = router

