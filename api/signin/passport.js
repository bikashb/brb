var passport = require('passport');
var Strategy =  require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const auth = require('../../app.config/auth.config');

passport.use(new Strategy(
    auth.fbAuth,
  function(accessToken, refreshToken, profile, cb){
    return cb(null, profile);
  }));


passport.use(new GoogleStrategy(
      auth.gAuth,function(accessToken, refreshToken, profile,cb){
      return cb(null,profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


exports = module.exports = passport;
