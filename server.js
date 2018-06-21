// Pull in required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 8000;

var app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override POST errors
app.use(methodOverride('_method'));

// Requiring handlebars for our index view
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Importing routes
var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

app.listen(port);