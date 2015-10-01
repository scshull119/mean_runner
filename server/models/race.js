var mongoose = require('mongoose');

var RaceSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  mileage: {type: Number},
  raceType: {type: String},
  borough: {type: String},
  venue: {type: String},
  producer: {type: String},
  url: {type: String}
});

var Race = mongoose.model('race', RaceSchema);

module.exports = Race;
