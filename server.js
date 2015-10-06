// Dependency Requirements
var express    =  require('express'),
    bodyParser =  require('body-parser'),
    mongoose   =  require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost/mean_runner');

var Race = require('./server/models/race');
var Course = require('./server/models/course');
var User = require('./server/models/user');

// Create Express application object
var app = express();

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setting public folder
app.use(express.static(__dirname + "/client"));


// Basic routes to index page and private API admin
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/client/admin.html');
});

// Controllers
var UsersController = require('./server/controllers/users');
app.use('/api/users', UsersController);

// Listening
app.listen('8080', function() {
  console.log("Listening on 8080...")
});
