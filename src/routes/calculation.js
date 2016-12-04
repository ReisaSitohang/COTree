'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const sequelize  =  require( 'sequelize' )
const Promise    =  require('promise')
const db         =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});

router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 


//Define database tables/model
let User = db.define('nofbuser', {
	name: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
});

let Donation = db.define('donation', {
	donationamount: sequelize.DECIMAL
})

let Kilometer = db.define('kilometer', {
	kilometercount: sequelize.INTEGER
})

let kenteken = db.define('kenteken', {
	kenteken: sequelize.STRING,
	brandstofomschrijving: sequelize.STRING,
	brandstofverbruikcombi: sequelize.DECIMAL,
}, {
	timestamps: false
})

//Define DB structure

User.hasMany ( Donation )
Donation.belongsTo ( User )

User.hasMany ( Kilometer )
Kilometer.belongsTo ( User )

//Sync DB
db.sync( {'force': false} ).then(

	() => { 
		console.log ( 'Synchronized' )
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
	)




//_________routes
router.get('/calculation', function (req, res) {

	res.render('calculationrdw')

})


router.post('/kentekencalc', function (req, res) {
	let Kenteken = req.body.kenteken
	console.log(kenteken)

	kenteken.findOne({
		where: {
			kenteken: Kenteken
		}
	}).then (car=>{
		res.send({brandstofverbruik: car.brandstofverbruikcombi, brandstofsoort: car.brandstofomschrijving})
	}).catch( err=>{
		console.log("Cannot find")
		res.send({err: err})
	})
})	



router.post('/donationcalc', function (req, res) {
	let user = req.session.user;
	User.findOne({
		where: {
			id: user.id
		}
	}).then	( user =>{
		user.createKilometer({
			kilometercount: req.body.kilometer
		})
		user.createDonation({
			donationamount: req.body.donation
		})			
	}).then( data =>{
		console.log("donationcalc is done")
		res.send(data)
	})
})	


router.get('/totals', function (req, res) {
	let user        = req.session.user;
	let sumKM       = 0
	let sumDonation = 0

	Promise.all([
		Kilometer.findAll({
			where: {
				nofbuserId: user.id
			}
		}).then(data=>{
			let kilometers = []
			for (var i = data.length - 1; i >= 0; i--) {
				let totalkm= data[i].kilometercount
				kilometers.push(totalkm)
			}
			sumKM = kilometers.reduce(add, 0);
			function add(a, b) {
				return a + b;
			}
			console.log("joehoe"+sumKM)
		}),
		Donation.findAll({
			where: {
				nofbuserId: user.id
			}
		}).then (data=>{
			let donations = []
			for (var i = data.length - 1; i >= 0; i--) {
				let totaldonation= data[i].donationamount
				donations.push(parseFloat(totaldonation))
			}
			sumDonation = donations.reduce(add, 0);
			function add(a, b) {
				return a + b;
			}
			console.log("joehoe"+sumDonation)
		})
	]).then ( ()=>{
		res.send({sumKM, sumDonation })
	})
})


//__________Export module
module.exports = router