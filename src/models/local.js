// const express = require('express');
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
// const db = require('./database');
// const bCrypt = require('bcrypt');



// module.exports = (passport) => {

// 	passport.serializeUser( (user, done) {
// 		done(null, user.id)
// 	})

// 	passport.deserializeUser((id, done) => {
// 		User.findById(id, (err, user) => {
// 			done(err, user)
// 		})
// 	})

// 	passport.use('signup', new LocalStrategy({
// 	  	usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true 
// 	}, (req, email, password, done) => {
// 		process.nextTick(() => {
// 			User.findOne({'local.email: email'}, (err, user)=> {
// 				if (err) return done(err)

// 				if(user) {
// 					return done(null, false, req.flash('signupMessage', 'Sorry, email is already takes.'))
// 				} else {
// 					let newUser = new User()
// 					newUser.local.email = email
// 					newUser.local.password = newUser.generateHash(password)
// 					newUser.save((err)=> {
// 						if(err)
// 							throw err
// 						return done(null, newUser)
// 					})
// 				}
// 			})
// 		})
// 	})

// 	)
// }

