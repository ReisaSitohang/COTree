'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const sequelize  =  require( 'sequelize' )
const db         =  require(__dirname+'/../models/database')


router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



//Define database tables/model
db.user = db.connection.define('user', {
	fbid: sequelize.BIGINT,
	firstname: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true}
})

db.Donation = db.connection.define('donation', {
	donationamount: sequelize.DECIMAL
})

db.Kilometer = db.connection.define('kilometer', {
	kilometercount: sequelize.INTEGER
})

//Define DB structure

db.user.hasMany ( db.Donation )
db.Donation.belongsTo ( db.user )

db.user.hasMany ( db.Kilometer )
db.Kilometer.belongsTo ( db.user )

//Sync DB
db.connection.sync( {'force': true} ).then(

	() => { 
		console.log ( 'Synchronized' )
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
	)




//_________routes
router.get('/calculation', function (req, res) {
		res.render('calculationrdw')
});

router.post('/calculation', function (req, res) {
		// console.log("Donation: "+req.body.donation)
		// console.log("Kilometer: "+req.body.kilometer)
			db.Kilometer.create({
				kilometercount: req.body.kilometer
				// userId: user.id
			})
			db.Donation.create({
				donationamount: req.body.donation
				// userId: user.id
			})
	})			


//__________Export module
module.exports = router