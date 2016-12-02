'use strict'
const express = require( 'express' )
const router = express.Router()

router.get( '/profile', (req, res) => {
	console.log("Someone's home")
	let data = {
	donationAmount: 7,
	fulltree: 7/2,
	remainder: ((7 % 2)/2)*100 + 'px'
	}
	for (var i = 1; i < data.fulltree; i++) {
		console.log("i looped " + i + "times!")
	}
	console.log(data.remainder)
	// get user info
	res.render('profile', {data: data})
})

module.exports = router