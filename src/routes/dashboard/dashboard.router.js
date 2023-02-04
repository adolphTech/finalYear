const express = require("express");


const {httpRenderDashboard}= require("./dashboard.controller");


const dashboardRouter = express.Router();

dashboardRouter.get("/",httpRenderDashboard);



module.exports = dashboardRouter;