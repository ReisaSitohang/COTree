'use strict'
//Import modules
const express    =  require( 'express' )
const fs 		 = 	require( 'fs' )
const app        =  express( )
const bodyParser =  require('body-parser')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')


const nodesass   = 	require('node-sass')

const sass   	 =  require('node-sass')

const fs         =  require('fs')
const db         =  require('./models/database')
const passport   =  require('passport')
const Strategy   =  require('passport-facebook').Strategy
let facebook     =  require('./models/facebook')


app.use(passport.initialize());
app.use(passport.session());



// var initPassport = require('./passport/init');
// initPassport(passport);



const db = require(__dirname + '/models/database')


sass.render({
	file: __dirname + '/static/sass/materialize.scss',
	outFile: __dirname + '/static/css/materialize.css'
}, (error, result) => {
	if(!error) {
		fs.writeFile(__dirname + '/static/css/materialize.css', result.css.toString('utf8'), (err) =>{
			if(!err){
				console.log("file written to disk")
			}
		})
	}
})




//Set views
app.set('views', './views')
app.set('view engine', 'pug')

//Use static folder

app.use (express.static(__dirname + '/static'))

nodesass.render({
	file: __dirname + '/static/sass/materialize.scss',
	outFile: __dirname + '/static/css/materialize.css'
}, (error, result) => {
	if(!error) {
		fs.writeFile(__dirname + '/static/css/materialize.css', result.css.toString('utf8'), (err) =>{
			if(!err){
				console.log("file written to disk")
			}
		})
	}
})

nodesass.render({
	file: __dirname + '/static/sass/style.scss',
	outFile: __dirname + '/static/css/style.css'
}, (error, result) => {
	if(!error) {
		fs.writeFile(__dirname + '/static/css/style.css', result.css.toString('utf8'), (err) =>{
			if(!err){
				console.log("style written to disk")
			}
		})
	}
})

//Setting Routes
//let loginlogoutRouter = require( __dirname + '/routes/login' )
//let registerRouter 	  = require( __dirname + '/routes/register' )
let homeRouter 		  = require( __dirname + '/routes/home' )
let calculationRouter = require( __dirname+'/routes/calculation' )

// Declaring the passport stuff
// //Setting Routes
let login = require(__dirname + '/routes/login' )
//app.use('/', loginlogoutRouter )
//app.use('/', registerRouter )
app.use('/', homeRouter )
app.use('/', calculationRouter )
app.use('/', login)


//Set port
app.listen(3000, function () {
	console.log('Yep Running')
})







