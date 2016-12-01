'use strict'
const express       = require('express');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        =  require('bcrypt-nodejs')
const db            = require('./database');
const init          = require('../config/initialize')


module.exports = function(passport){

	passport.use( new LocalStrategy ( {
			 usernameField: 'email',
             passwordField: 'password',  
             passReqToCallback : true
        },

        function(req, email, password, done) {
        	db.user.find( { 
                where: {
                    'email' :  req.body.email 
                }
            }).then(
        		function(user) {
        			if (!user){
                        console.log('User Not Found with email ');
                        return done(null, false, req.flash('message', 'User Not found or Invalid Password.'));                 
                    }

                    if (!validPw(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'User Not found or Invalid Password.')); // redirect back to login page
                    }
                    console.log('found user')
                    return done(null, user);
                },
                function(err) {
                	return done(err);
                });
        })
    );
    let validPw = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
}
