const passport = require('passport')
const LocalStrategy   = require('passport-local').Strategy;
const db = require('./database');


module.exports = (passport) => {
	passport.use(new LocalStrategy((username, password, callback) =>{
		user.findOne({email: email}, (err, user) => {
			if (err) {return callback(err)}
			if (!user) {
				return callback(null, false, {message: 'Email or password icorrect'})
			}
			if (!user.validPassword(password)) {
				return callback(null, false, {message: 'Email or password incorrect'})
			}
			return callback(null, user)
		})
	}))
}


