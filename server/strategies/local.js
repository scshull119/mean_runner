var http          = require('http'),
    path          = require('path'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User          = require('mongoose').model('User');

module.exports = function() {
  console.log("Hey local");
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if(err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if(!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      return done(null, user);
    });
  }));
};
