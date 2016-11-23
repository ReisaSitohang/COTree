'use strict'
const express = require( 'express' )
const router = express.Router()

router.get( '/home', (req, res) => {
	console.log("Someone's home")

	

	res.render('home')
})

module.exports = router