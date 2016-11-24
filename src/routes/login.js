const express    =  require ('express')
const app        =  express()
const bodyParser =  require('body-parser')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')
const sass   	 =  require('node-sass')
const fs         =  require('fs')



app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);