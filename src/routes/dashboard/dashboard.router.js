const express = require("express");



const { ensureAuthenticated, ensureDoctorAuthenticated, ensurePatientAuthenticated } = require("../../middlewares/auth")


const { httpRenderDocDashboard, httpRenderPatDashboard, httpRenderHome } = require("./dashboard.controller");


const dashboardRouter = express.Router();

dashboardRouter.get("/doctor", ensureAuthenticated, ensureDoctorAuthenticated, httpRenderDocDashboard);
dashboardRouter.get("/patient", ensureAuthenticated, ensurePatientAuthenticated, httpRenderPatDashboard);
dashboardRouter.get("/", httpRenderHome)

// dashboardRouter.get("/table",renderTable)



module.exports = dashboardRouter;