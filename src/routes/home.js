'use strict'
const express = require( 'express' )
const router = express.Router()


router.get( '/home', (req, res) => {
	console.log("Someone's home")
	// MOCK DATA -- no longer in use

	// let donation = 0
	// let data = {
	// // donationAmount: donation,
	// // fulltree: donation/2,
	// // remainder: ((donation % 2)/2)*100 + 'px'
	// // }
	// // for (var i = 1; i <= data.fulltree; i++) {
	// // 	console.log("i looped " + i + "times!")
	// // }
	// // console.log(data.remainder)
	// // get user info
	// res.render('home', {data: data})
})

module.exports = router