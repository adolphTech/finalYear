const express = require("express");



const { ensureAuthenticated, ensureDoctorAuthenticated, ensurePatientAuthenticated, ensureAdminAuthenticated } = require("../../middlewares/auth")


const { httpRenderDocDashboard, httpRenderPatDashboard, httpRenderHome, renderAdmin } = require("./dashboard.controller");


const dashboardRouter = express.Router();

dashboardRouter.get("/doctor", ensureAuthenticated, ensureDoctorAuthenticated, httpRenderDocDashboard);
dashboardRouter.get("/patient", ensureAuthenticated, ensurePatientAuthenticated, httpRenderPatDashboard);
// dashboardRouter.get("/admin", ensureAdminAuthenticated, ensureAdminAuthenticated, renderAdmin)
dashboardRouter.get("/", httpRenderHome)

// dashboardRouter.get("/table",renderTable)



module.exports = dashboardRouter;