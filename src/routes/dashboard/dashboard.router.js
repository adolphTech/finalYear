const express = require("express");



const {ensureAuthenticated} = require("../../middlewares/auth")


const {httpRenderDashboard,}= require("./dashboard.controller");


const dashboardRouter = express.Router();

dashboardRouter.get("/",ensureAuthenticated,httpRenderDashboard);
// dashboardRouter.get("/table",renderTable)



module.exports = dashboardRouter;