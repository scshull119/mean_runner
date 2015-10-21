var passport = require('passport'),
    mongoose = require('mongoose');



module.exports = function() {
  console.log("Hey passport");
  var User = mongoose.model('User');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user) {
      done(err, user);
    });
  });

  require('./server/strategies/local.js')();
};
