'use strict'
// require modules
const sequelize = require( 'sequelize' )
const bcrypt = require('bcrypt-nodejs')

// Container object
let db = {
	module: {}
}


// Initiate database 
db.connection       =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres',
						// dialectOptions: {supportBigNumbers: true}
					});


// facebook user

db.fbuser = db.connection.define('fbuser', {	
	fbid: {type: sequelize.BIGINT, unique: true},
	firstname: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true}
})

// normal user 
db.user = db.connection.define('user', {
	firstname: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING 
})


db.kenteken = db.connection.define('kenteken', {
	kenteken: sequelize.STRING,
	brandstofomschrijving: sequelize.STRING,
	brandstofverbruikcombi: sequelize.DECIMAL,
	}, {
    timestamps: false
})


db.Donation = db.connection.define('donation', {
	donationamount: sequelize.DECIMAL
})

db.Kilometer = db.connection.define('kilometer', {
	kilometercount: sequelize.BIGINT
})

//Define DB structure

// NORMAL USER

db.user.hasMany ( db.Donation )
db.Donation.belongsTo ( db.user )

db.user.hasMany ( db.Kilometer )
db.Kilometer.belongsTo ( db.user )

/// FACEBOOK 

db.fbuser.hasMany ( db.Donation )
db.Donation.belongsTo ( db.fbuser )

db.fbuser.hasMany ( db.Kilometer )
db.Kilometer.belongsTo ( db.fbuser )



db.connection.sync( {force: true} ).then(

	() => { 
		console.log ( 'Synchronized' )
		bcrypt.hash('mentor', null, null, (err,hash) =>{
		db.user.create({
			name: "Mentor",
			lastname: "Mentor",
			email:"mentor@mentor.mentor",
			password: hash
		}).then(()=>{
			console.log( 'Mentor said mentor, and there was mentor. #bible' )
		})
	})
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
	)

module.exports = db