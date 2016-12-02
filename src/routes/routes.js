'use strict'
const express                     = require ('express')
const sequelize                   = require('sequelize')
const passport                    = require('passport');
const session                     = require('express-session')
const router                      = express.Router()
const Strategy                    = require('passport-facebook').Strategy;
const LocalStrategy               = require('passport-local').Strategy;
const bcrypt                      = require('bcrypt-nodejs')
const db                          = require('../models/database');
const local                       = require('../models/local');
const facebook                    = require('../models/facebook')
<<<<<<< 96ff2a6caa9692889f401d25662d6f082cee9d9e

=======
>>>>>>> login and facebook login done minor bug


router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


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
.post(local.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/index'
	})
);


router.route('/auth/facebook')
.get(facebook.authenticate('facebook', {scope: ['public_profile', 'email']}))


router.route('/auth/facebook/callback')
.get(facebook.authenticate('facebook', {
	successRedirect: '/profile',
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

router.route('/donate')
.get((req,res) => {
	res.render('donate')
}
);


////////////////////////
////// REGISTER ///////
//////////////////////

router.route('/register')
.get((req,res)=> {
	res.render('register')
})
.post((req,res)=> {
	console.log(req.body)
	bcrypt.hash(req.body.password, null, null, (err,hash) =>{
		db.user.create({
			name: req.body.first_name,
			lastname: req.body.last_name,
			email:req.body.email,
			password: hash
		}).then(()=>{
			res.redirect('/?message=' +encodeURIComponent('Account created, you can now log-in'))
		})
	})
})


module.exports = router

