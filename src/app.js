'use strict'
//Import modules
const express         =  require( 'express' )
const fs 		      =  require( 'fs' )
const app             =  express( )
const bodyParser      =  require('body-parser')
const sequelize       =  require('sequelize')
const session         =  require('express-session')
const bcrypt          =  require('bcrypt-nodejs')
const nodesass        =  require('node-sass')
const passport        =  require('passport')
const Strategy        =  require('passport-facebook').Strategy
const LocalStrategy   =  require('passport-local').Strategy
const cookieParser    =  require('cookie-parser')

app.use (express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(cookieParser())
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views')
app.set('view engine', 'pug')


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
let profile 		  = require( __dirname + '/routes/profile' )
let calculationRouter = require( __dirname+'/routes/calculation' )
let routes            = require(__dirname + '/routes/routes' )



app.use('/', homeRouter )

app.use('/', profile )
app.use('/', calculationRouter )
app.use('/', routes)




//Set port
app.listen(3000, function () {
	console.log('Yep Running')
})







