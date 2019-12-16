// const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// expose this function to our app using module.exports
module.exports = passport => {
  // =====Don't need to serialize/deserialize - using jwt instead=====
  // used to serialize the user for the session
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });
  // used to deserialize the user
  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });

  passport.use(
    "local",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "username",
        passwordField: "password"
        // allows us to pass back the entire request to the callback
        // passReqToCallback: true
      },
      function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validatePassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );
};
