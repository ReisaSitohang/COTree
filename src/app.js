'use strict'
//Import modules
const express         =  require( 'express' )
const fs 		      =  require( 'fs' )
const app             =  express( )
const bodyParser      =  require('body-parser')
const sequelize       =  require('sequelize')
const session         =  require('express-session')
const bcrypt          =  require('bcrypt-nodejs')
const nodesass        = require('node-sass')
const passport        =  require('passport')
const Strategy        =  require('passport-facebook').Strategy
const LocalStrategy   =  require('passport-local').Strategy
let facebook          =  require('./models/facebook')


app.use(passport.initialize());
app.use(passport.session());

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

let profile 		  = require( __dirname + '/routes/profile' )
let calculationRouter = require( __dirname+'/routes/calculation' )
let routes            = require(__dirname + '/routes/routes' )



app.use('/', profile )
app.use('/', calculationRouter )
app.use('/', routes)



//Set port
app.listen(3000, function () {
	console.log('Yep Running')
})







