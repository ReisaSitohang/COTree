'use strict'
const express    =  require( 'express' )
const router     =  express.Router(  )
const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const sequelize  =  require( 'sequelize' )
const db         =  require(__dirname+ '/../models/database')


router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



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