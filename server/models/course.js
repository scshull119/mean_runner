var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  name: {type: String},
  mileage: {type: Number},
  borough: {type: String},
  venue: {type: String},
  description: {type: String},
  kmlName: {type: String}
});

var Course = mongoose.model('course', CourseSchema);

module.exports = Course;
