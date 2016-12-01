'use strict'
const express                     =  require ('express')
const sequelize                   =  require('sequelize')
const passport                    = require('passport');
const session                     =  require('express-session')
const router                      = express.Router()
const Strategy                    = require('passport-facebook').Strategy;
const LocalStrategy               = require('passport-local').Strategy;
const init                        = require('../config/initialize.js')
const bcrypt                      =  require('bcrypt-nodejs')
const db                          = require('../models/database');
const local                       = require('../models/local');


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
  .post(passport.authenticate('local', {    successRedirect: '/profile',
                                   			failureRedirect: '/index',
                                   			failureFlash: true }));



router.route('/auth/facebook')
	.get(passport.authenticate('facebook', {scope: ['public_profile', 'email']}))


router.route('/auth/facebook/callback')
	.get(passport.authenticate('facebook', {
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
    .post((req,result)=> {
        console.log(req.body)
        bcrypt.hash(req.body.password, null, null, (err,hash) =>{
            db.user.create({
                name: req.body.first_name,
                lastname: req.body.last_name,
                email:req.body.email,
                password: hash
            }).then(()=>{
                result.redirect('/?message=' +encodeURIComponent('Account created, you can now log-in'))
            })
        })
    })



module.exports = router

