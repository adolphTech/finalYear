const express = require("express");

const {ensureAuthenticated} = require("../../middlewares/auth")

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
appointmentRouter.get("/doc",ensureAuthenticated, httpRenderDoctorsAppointments);
appointmentRouter.get("/pat",httpFetchSpecPatientAppointment)
appointmentRouter.get("/patients",ensureAuthenticated,httpRenderPatientAppointments)

module.exports = appointmentRouter;
