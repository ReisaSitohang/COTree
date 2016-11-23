'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
// const session    =  require( 'express-session' )
// const bodyParser =  require( 'body-parser' )
// const Sequelize  =  require( 'sequelize' )
// const db         =  new Sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
// 	host: 'localhost',
// 	dialect: 'postgres'
// });

//_________routes
router.get('/calculation', function (req, res) {
		res.render('calculation')
});


//__________Export module
module.exports = router