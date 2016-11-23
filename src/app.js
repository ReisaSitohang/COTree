'use strict'
//Import modules
const express    =  require( 'express' )
const app        =  express( )
const bodyParser =  require('body-parser')
const Sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')
const nodesass   = 	require('node-sass')
const db         =  new Sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});
//Set views
app.set('views', './views')
app.set('view engine', 'pug')

//Use static folder
app.use (express.static(__dirname + '/static'))

//Setting Routes
//let loginlogoutRouter = require( __dirname + '/routes/login' )
//let registerRouter 	  = require( __dirname + '/routes/register' )
let homeRouter 		  = require( __dirname + '/routes/home' )

//app.use('/', loginlogoutRouter )
//app.use('/', registerRouter )
app.use('/', homeRouter )

//Set port
app.listen(3000, function () {
	console.log('Yep Running')
} )