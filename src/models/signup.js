const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');


module.exports = (passport) =>  {

	passport.use( new LocalStrategy ( {
            usernameField: 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) {
            console.log(req.body)
        	findOrCreateUser = () => {	
        			db.user.findOne({
        				where: {
        					email: req.user.email
        				}
        			}).then(function( user ) {
        				if (user) {
        					console.log('User with that email already excists');
        					return done(null, false, request.flash('message','User Already Exists'));
        				} else {
        					console.log('cant find the user, creating new one ')
        					db.user.create( {
                                'firstname': req.body.first_name,
                                'lastname': req.body.last_name,
        						'email': req.body.email,
        						'password': createHash(req.body.password)        			
        					} ).then(function(user) {
        						console.log('User Registration successfull');    
        						return done(null, user);
        					});
        				}
        			})				
        		}
  	 		process.nextTick(findOrCreateUser);
        	}))
            let createHash = (password) => {
                return bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(10), null);
    }
}