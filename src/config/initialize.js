'use strict'
const passport = require('passport');
const db = require('../models/database');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
    	done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    	db.user.find( { 
            where: { 
                email: req.body.email
            }
        }).then(
    		function(user) { 
                done(null, user) 
            },
    		function(err) { 
                done(err, null) 
            }
    	);
    });

    login(passport);

}