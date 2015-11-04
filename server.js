// Dependency Requirements
var express    =  require('express'),
    bodyParser =  require('body-parser'),
    session    =  require('express-session'),
    mongoose   =  require('mongoose'),
    passport   =  require('passport'),
    LocalStrategy = require('passport-local').Strategy,
  //  uriUtil = require('mongodb-uri'),
    morgan    =  require('morgan');

// Database connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mean_runner');



var Race = require('./server/models/race');
var Course = require('./server/models/course');
var User = require('./server/models/user');

// Create Express application object
var app = express();

app.use(morgan('dev'));

// User authentication
app.use(session({
  secret: 'keyboard cat',
  resave: 'false',
  saveUninitialized: 'false'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-password -salt', function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, user) {
    if(err) {
      console.log("Error");
      return done(err);
    }

    if(!user) {
      console.log("Not a valid user");
      return done(null, false, {
        message: 'Unknown user'
      });
    }

    user.authenticate(password, function(isMatch) {
      if(!isMatch) {
        console.log("Wrong password");
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      console.log("I think we're good, " + user);
      //user.populate('myCourse');
      return done(null, user);
    });

  }).populate('myCourse').populate('myRace');
}));

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

app.get('loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});

// Controllers
var UsersController = require('./server/controllers/users');
app.use('/api/users', UsersController);

var RacesController = require('./server/controllers/races');
app.use('/api/races', RacesController);

var CoursesController = require('./server/controllers/courses');
app.use('/api/courses', CoursesController);

// Listening
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port + "...");
});
