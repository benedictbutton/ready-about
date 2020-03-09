const { ApolloServer } = require('apollo-server-express');
const {
  ApolloGateway,
  RemoteGraphQLDataSource,
} = require('@apollo/gateway');

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
const models = require('./models/index');
const schema = require('./schema/index');
const resolvers = require('./resolvers/index');

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

const isDev = process.env.NODE_ENV !== 'production';

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

const auth = require('./config/authentication');

app.all('/graphql', auth.required);

// Initialize an ApolloGateway instance and pass it an array of implementing
// service names and URLs
// const gateway = new ApolloGateway({
//   serviceList: [
//     { name: 'User', url: 'http://localhost:4002/graphql' },
//     { name: 'Word', url: 'http://localhost:4001/graphql' },
//     // more services
//   ],
// buildService({ name, url }) {
//   return new RemoteGraphQLDataSource({
//     url,
//     willSendRequest({ request, context }) {
//       // pass the user's id from the context to underlying services
//       // as a header called `user-id`
//       request.http.headers.set('x-models', context.models);
//     },
//   });
// },
// });

// const conn = mongoose.createConnection(
//   process.env.DATABASE_URL,
//   {
//     useNewUrlParser: true,
//   },
//   (err, database) => {
//     if (err) return console.log(err);
//     //   const db = database;
//     //   require("./routes")(db);
//   },
// );

const getMe = async req => {
  // const token = req.headers['x-token'];

  // if (token) {
  try {
    const me = await auth.required;
    debugger;
    return me;
  } catch (e) {
    // throw new AuthenticationError(
    //   'Your session expired. Please sign in again.',
    console.log(e);
  }
  // }
};

const server = new ApolloServer({
  // Pass the ApolloGateway to the ApolloServer constructor
  // gateway,
  typeDefs: schema,
  resolvers,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  formatError: error => {
    const { message } = error;
    console.log(error);
    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const me = req.payload;
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app });

app.listen(port, () => console.log('Ready. Running on port', port));

scheduler.start();
