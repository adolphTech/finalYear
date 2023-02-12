"use strict";
const express = require("express");
const app = express();
const hbs = require("hbs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");



const docPassport = require("./middlewares/both.passport");






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//express session middleware
app.use(
  session({
    name: "flash",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

//passport middleware
// app.use(passportPatient.initialize());
// app.use(passportPatient.session());

// app.use(passportDoctor.initialize());
// app.use(passportDoctor.session());
app.use(passport.initialize());
app.use(passport.session());

// Passport Strategies
docPassport(passport, "patient");
docPassport(passport, "doctor");

//connect flash

app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//flash message

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// views and public directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// app.set('view engine', 'ejs');

// route paths
const dashboardRouter = require("./routes/dashboard/dashboard.router");
const chatBotRouter = require("./routes/chatbot/chatbot.router");
// const usersRouter = require("./routes/users/users.router");
const docsRouter = require("./routes/users/docs/docs.router")
const usersRouter = require("./routes/users/patients/patients.router")

// routes
app.use("/", dashboardRouter);
app.use("/chat", chatBotRouter);
app.use("/users", usersRouter);
app.use("/docs",docsRouter)

module.exports = app;
