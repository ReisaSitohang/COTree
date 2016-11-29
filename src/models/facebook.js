const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const db = require('./database');

const configAuth = require('../config/auth');


passport.use('facebook', new Strategy({
   clientID: configAuth.facebookAuth.clientID,
   clientSecret:  configAuth.facebookAuth.clientSecret,
   callbackURL: configAuth.facebookAuth.callbackURL,
   profileFields: ['id', 'name', 'email']
 },
 function(accessToken, refreshToken, profile, callback) {
  
  profile.accessToken = accessToken;
  console.log(profile)

findOrCreateUser = () => {
  db.user.find({where: {'fbid' : profile.id}}).then((user)=> {
    if (user) {
      console.log('User already exists with this username')
      return
    } else {
      console.log(db.user)
      console.log('The user cannot be found, creating new one')
      db.user.create({
        'fbid': profile.id,
        'firstname': profile.name.givenName,
        'lastname': profile.name.familyName,
        'email': profile.emails[0].value
      }).then((user)=>{
        console.log('User registered')
        return
      })
    }
  })
}



process.nextTick(findOrCreateUser);
return callback(null, profile);

}))

passport.serializeUser(function(user, callback) {
 var sessionUser = {
   id: user.id,
   accessToken: user.accessToken
 }
callback(null, sessionUser);
});

passport.deserializeUser(function(id, done) {
   var accessToken = id.accessToken;
     db.mainuser.find( { 
       where: {
           fbid: id.id
         }
       }
       ).then(
       function(user){ 
         user.accessToken = accessToken;
         done(null, user) 
       },
       function(err){ 
         done(err, null) 
       }
     );
})