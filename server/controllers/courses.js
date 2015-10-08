var express       = require('express'),
    Course        = require('../models/course'),
    coursesRouter = express.Router();

coursesRouter.get('/', function(req, res) {
  Course.find({}, function(err, results) {
    res.json(results);
  });
});

coursesRouter.post('/', function(req, res) {
  var course = new Course(req.body);
  course.save(function() {
    res.json(course);
  });
});

module.exports = coursesRouter;
