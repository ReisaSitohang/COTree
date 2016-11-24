'use strict'
const express = require( 'express' )
const router = express.Router()

router.get( '/home', (req, res) => {
	console.log("Someone's home")
	let data = {
	donationAmount: 7,
	fulltree: 7/2,
	remainder: (7 % 2)/2
	}
	for (var i = 1; i < data.fulltree; i++) {
		console.log("i looped " + i + "times!")
	}
	console.log(data.remainder)
	// get user info
	res.render('home', {data: data})
})

module.exports = router