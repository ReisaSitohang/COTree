'use strict'
const express    =  require( 'express' )
const router     =  express.Router(  )
const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const sequelize  =  require( 'sequelize' )
const db         =  require(__dirname+'/../models/database')
const passport   = require('passport')
const LocalStrategy = require('passport-local').Strategy;



router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



//_________routes
router.get('/calculation', function (req, res) {

		res.render('calculationrdw')

})


router.post('/kentekencalc', function (req, res) {
	let kenteken = req.body.kenteken
	console.log(kenteken)

	db.kenteken.findOne({
		where: {
			kenteken: kenteken
		}
	}).then (car=>{
	 	res.send({brandstofverbruik: car.brandstofverbruikcombi, brandstofsoort: car.brandstofomschrijving})
	}).catch( err=>{
		console.log("Cannot find")
		res.send({err: err})
	})
})	



router.post('/donationcalc', function (req, res) {
		// let user = req.session.db.user
		// console.log(user)

		// user = req.session.db.user
		// console.log("joehoe"+user)

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