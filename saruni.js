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

const redis = require('redis');
// const RedisStore = require('connect-redis')(session);

// const redisClient = redis.createClient();

// twilio 

// const client = redis.createClient({
//   host: 'localhost',
//   port: 6379,
// });

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

// app.use(
//   session({
//     name: "flash",
//     secret: process.env.SESSION_SECRET,
//     store: new RedisStore({ client }),
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       // secure: true, // Set to true if using HTTPS
//       maxAge: 1000* 60 * 100, // Session expiration time in milliseconds
//     },
//   })
// );

//passport middleware
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
const docsRouter = require("./routes/users/docs/docs.router")
const usersRouter = require("./routes/users/patients/patients.router")
const appointmentsRouter = require("./routes/appointments/appointment.router")
const prescriptionRouter = require("./routes/prescriptions/prescriptions.router")
const patManageRouter = require("./routes/manage/manage.router")
const meetingRouter = require("./routes/meeting/meeting.router")
const messageRouter = require("./routes/message/message.router")
const picsRouter = require("./routes/profiles/pic.router")
    // routes
app.use("/", dashboardRouter);
app.use("/chat", chatBotRouter);
app.use("/users", usersRouter);
app.use("/docs", docsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/presc", prescriptionRouter);
app.use("/manage", patManageRouter);
app.use("/meeting", meetingRouter);
app.use("/message", messageRouter);
app.use("/pic", picsRouter);
module.exports = app;