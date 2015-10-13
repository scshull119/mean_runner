var express     = require('express'),
    User        = require('../models/user'),
    passport    = require('passport'),
    usersRouter = express.Router();

usersRouter.get('/', function(req, res) {
  User.find({}, function(err, results) {
    res.json(results);
  });
});

usersRouter.post('/', function(req, res) {
  var user = new User(req.body);
  user.save(function() {
    res.json(user);
  });
});

module.exports = usersRouter;
