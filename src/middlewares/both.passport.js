
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/users/patients/patients.model")
const Doc = require("../models/users/doc/docs.model");

module.exports = function (passport) {
  passport.use(
    "patient",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
        role: "PATIENT",
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "That email is not registered for users" });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "doctor",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match doctor
      Doc.findOne({
        email: email,
        role: "DOCTOR",
      })
        .then((doc) => {
          if (!doc) {
            return done(null, false, { message: "That email is not registered for patients" });
          }

          // Match password
          bcrypt.compare(password, doc.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, doc);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      Doc.findById(id, function (err, doc) {
        done(err, doc);
      });
    });
  });
};
