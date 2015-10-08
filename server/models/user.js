var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  first_name: {type: String},
  startMileage: {type: Number},
  startDays: {type: Number},
  startPaceMins: {type: Number},
  startPaceSecs: {type: Number}
});

UserSchema.pre('save', function(next) {
  if(user.isModified('password')) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
  next();
});

UserSchema.methods.authenticate = function(password, next) {
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    next(isMatch);
  });
};

var User = mongoose.model('user', UserSchema);

module.exports = User;