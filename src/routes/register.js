'use strict'
////////////////
///// APP /////
//////////////

// Require the modules
const sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt     =  require('bcrypt-nodejs')
const router = express.Router()

// Initiate body parser
router.use(bodyParser.urlencoded({ extended: true }));

// Initiate session 
router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


/////////////////////
///// DATABASE /////
///////////////////

const db         =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});

// Define user table and properties
let User = db.define('nofbuser', {
	name: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
});

////////////////////////
////// REGISTER ///////
//////////////////////

router.route('/register')
	.get((req,res)=> {
		res.render('register')
	})
	.post((req,result)=> {
		console.log(req.body)
		bcrypt.hash(req.body.password, null, null, (err,hash) =>{
			User.create({
				name: req.body.first_name,
				lastname: req.body.last_name,
				email:req.body.email,
				password: hash
			}).then(()=>{
				result.redirect('/?message=' +encodeURIComponent('Account created, you can now log-in'))
			})
		})
	})





//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router