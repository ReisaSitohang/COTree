'use strict'
const express = require( 'express' )
const router = express.Router()

router.route('/faq')
 	.get((req,res) => {
 		res.render('faq')
  		}
	);


module.exports = router