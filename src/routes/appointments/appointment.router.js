const express = require("express");

const { ensureAuthenticated, ensurePatientAuthenticated, ensureDoctorAuthenticated } = require("../../middlewares/auth")

const {
    httpAddAppointment,
    httpFetchAppointment,
    httpRenderDoctorsAppointments,
    httpRenderPatientAppointments,
    httpFetchSpecPatientAppointment,
} = require("./appointment.controller");

const appointmentRouter = express.Router();

appointmentRouter.post("/", httpAddAppointment);
appointmentRouter.get("/", httpFetchAppointment);
appointmentRouter.get("/doc", ensureAuthenticated, ensureDoctorAuthenticated, httpRenderDoctorsAppointments);
appointmentRouter.get("/pat", ensureAuthenticated, httpFetchSpecPatientAppointment)
appointmentRouter.get("/patients", ensureAuthenticated, ensurePatientAuthenticated, httpRenderPatientAppointments)

module.exports = appointmentRouter;

// todo :make two side bars