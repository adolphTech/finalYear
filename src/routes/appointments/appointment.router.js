const express = require("express");

const { ensureAuthenticated, ensurePatientAuthenticated, ensureDoctorAuthenticated } = require("../../middlewares/auth")

const {
    httpAddAppointment,
    httpFetchAppointment,
    httpRenderDoctorsAppointments,
    httpRenderPatientAppointments,
    httpFetchSpecPatientAppointment,
    httpRescAppointment,
    httpApproveResc
} = require("./appointment.controller");

const appointmentRouter = express.Router();

appointmentRouter.post("/", httpAddAppointment);
appointmentRouter.get("/", httpFetchAppointment);
appointmentRouter.get("/doc", ensureAuthenticated, ensureDoctorAuthenticated, httpRenderDoctorsAppointments);
appointmentRouter.get("/pat", httpFetchSpecPatientAppointment)
appointmentRouter.get("/patients", ensureAuthenticated, ensurePatientAuthenticated, httpRenderPatientAppointments);
appointmentRouter.post("/resc", httpRescAppointment);
appointmentRouter.post("/approve", httpApproveResc)

module.exports = appointmentRouter;

// todo :make two side bars