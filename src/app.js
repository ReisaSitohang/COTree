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
const db         =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});


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
	else if (error) {
			throw error
		}
})

//Setting Routes
let homeRouter 		  = require( __dirname + '/routes/home' )
let calculationRouter = require( __dirname+'/routes/calculation' )
let donate = require( __dirname+'/routes/donate' )
let login = require(__dirname + '/routes/login' )
let register = require(__dirname + '/routes/register' )
let faq = require(__dirname + '/routes/faq' )


app.use('/', homeRouter )
app.use('/', calculationRouter )
app.use('/', login)
app.use('/', donate)
app.use('/', register)
app.use('/', faq)


//Set port
app.listen(3000, function () {
	console.log('Yep Running')
})







