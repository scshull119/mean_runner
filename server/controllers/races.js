var express     = require('express'),
    Race        = require('../models/race'),
    racesRouter = express.Router();

racesRouter.get('/', function(req, res) {
  Race.find({}, function(err, results) {
    res.json(results);
  });
});

racesRouter.post('/', function(req, res) {
  var race = new Race(req.body);
  race.save(function() {
    res.json(race);
  });
});

module.exports = racesRouter;
