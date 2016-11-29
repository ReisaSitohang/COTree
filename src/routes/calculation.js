'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
// const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
// const Sequelize  =  require( 'sequelize' )
// const db         =  new Sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
// 	host: 'localhost',
// 	dialect: 'postgres'
// });

router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//_________routes
router.get('/calculation', function (req, res) {
		res.render('calculationrdw')
});

router.post('/calculation', function (req, res) {
		console.log("Donation: "+req.body.donation)
		console.log("Kilometer: "+req.body.kilometer)
});


//__________Export module
module.exports = router