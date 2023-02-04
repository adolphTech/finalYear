"use strict";
const  express = require("express")
const app = express();
const hbs = require("hbs");
const cors = require("cors");
const path = require("path");
const bodyParser =require("body-parser");





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());


// views and public directory
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


app.use(express.static(publicDirectoryPath));
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);




// route paths
const dashboardRouter = require("./routes/dashboard/dashboard.router")
const chatBotRouter = require("./routes/chatbot/chatbot.router")

// routes
app.use("/",dashboardRouter)
app.use("/chat",chatBotRouter)



module.exports = app;