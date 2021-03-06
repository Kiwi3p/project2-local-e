require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const helpers      = require('handlebars-helpers');
hbs.registerHelper(helpers()); //register helpers list from handlebars-helpers

const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session); //store teh session information in Mongo

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})//name of DB
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//EXpress session
app.use(
  session({
    secret: 'mysecret',  // A STRING is always needed to encrypt the session
    resave: true, 
    saveUninitialized: false,
    store: new MongoStore({ //store teh session information in Mongo
    mongooseConnection: mongoose.connection
    })
  })
)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));


// default value for title local
app.locals.title = 'Local-E';
app.locals.subtitle = 'Keep it Local';
app.locals.gmapKey = process.env.GOOGLE_MAPS_API_KEY;

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const favorite = require('./routes/favorite');
app.use('/', favorite);

module.exports = app;
