'use strict'
const express = require( 'express' )
const router = express.Router()
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

// router.get( '/home', (req, res) => {
// 	console.log("Someone's home")
// 	// MOCK DATA -- no longer in use

// 	let donation = 0
// 	let data = {
// 	donationAmount: donation,
// 	fulltree: donation/2,
// 	remainder: ((donation % 2)/2)*100 + 'px'
// 	}
// 	for (var i = 1; i <= data.fulltree; i++) {
// 		console.log("i looped " + i + "times!")
// 	}
// 	// console.log(data.remainder)
// 	// get user info
// 	res.render('home', {data: data})
// })

router.get('/home', function (req, res) {
	let user        = req.session.user;
	let sumKM       = 0
	let sumDonation = 0
	let remainder 	= ''
	let fulltree 	= 0

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
			remainder = ((sumDonation % 2)/2)*100 + 'px'
			fulltree  = sumDonation/2
			console.log("joehoe"+sumDonation + remainder + fulltree)
		})
	]).then ( ()=>{
		res.render('home', {sumKM, sumDonation, remainder, fulltree })
	})
})

module.exports = router