const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const Doc = require("../models/users/doc/docs.model");
module.exports = function (passport) {
  passport.use(
    "doctor",
    new LocalStrategy({ usernameField: "doctorEmail" }, (doctorEmail, password, done) => {
      // Match user
      Doc.findOne({
        email: doctorEmail,
        
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

  passport.serializeUser(function(doc, done) {
    done(null,doc.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Doc.findById(id, function(err, doc) {
      done(err, doc);
    });
  });
  
};
