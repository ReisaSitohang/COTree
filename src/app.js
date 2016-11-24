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

const db = require(__dirname + '/models/database')



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

//app.use('/', loginlogoutRouter )
//app.use('/', registerRouter )
app.use('/', homeRouter )
app.use('/', calculationRouter )

//Set port
app.listen(3000, function () {
	console.log('Yep Running')
})




// //Setting Routes
// let indexRoot = require(__dirname + '/routes/index' )
// let login     = require(__dirname + '/routes/login')
// let register  = require(__dirname + '/routes/register')
// let profile   = require(__dirname + '/routes/profile')


// app.use('/', indexRoot)
// app.use('/', login)
// app.use('/', register)
// app.use('/', profile)
// app.use('/', registerRouter )

