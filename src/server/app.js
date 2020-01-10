const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const passport = require('passport');
const scheduler = require('./config/scheduler');

// initiate app
const app = express();

// configure app
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const isDev = NODE_ENV === 'development';

const port = process.env.PORT || process.argv[2] || 8080;

const FileStore = require('session-file-store')(session);

app.use(
  session({
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Models
// require('./models/user');
// require("./config/passport");
require('./config/passport')(passport); // pass passport for configuration

// const User = require("./models/user");
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
  },
  (err, database) => {
    if (err) return console.log(err);
    //   const db = database;
    //   require("./routes")(db);
  },
);

mongoose.set('debug', true);

// process requests to api/auth with routes/auth.js file
app.use('/api', require('./routes/index.js'));

if (isDev) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../../webpack.config.js');
  app.use(errorHandler());
  app.use(
    webpackMiddleware(webpack(webpackConfig), {
      publicPath: '/',
      status: { colors: true },
    }),
  );
} else {
  console.log('test');
  app.use(express.static('dist'));
}

// default route
app.get('/*', function(req, res) {
  res.sendFile(
    path.join(__dirname, '../../dist/index.html'),
    function(err) {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

app.listen(port, () => console.log('Ready.'));

scheduler.start();
