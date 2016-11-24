'use strict'
//Import modules
const express    =  require ('express')
const app        =  express()
const bodyParser =  require('body-parser')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')
const sass   	 =  require('node-sass')
const fs         =  require('fs')

let db = require(__dirname + '/models/database')


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
app.use(express.static(__dirname + '/static'))


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

// Set port

app.listen(8000, function () {
	console.log('Server Running like Usian Bolt')
} )