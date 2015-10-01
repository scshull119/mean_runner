var express    =  require('express'),
    bodyParser =  require('body-parser'),
    mongoose   =  require('mongoose');

mongoose.connect('mongodb://localhost/mean_runner');

var Race = require('./server/models/race');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen('8080', function() {
  console.log("Listening on 8080...")
});
