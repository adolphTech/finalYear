const axios = require("axios");
const moment = require('moment');
const Appointment = require("../../models/appointments/appoitments.model");
const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");

//this is the dashboard controller

async function httpRenderPatDashboard(req, res) {

    try {
        let isDoc;

        if (req.user.role === "DOCTOR") {
            isDoc = true;

        }

        res.render("dashboard.pat.hbs", { isDoc, page: "PATIENT DASHBOARD" })

        // console.log(req)



    } catch (e) {
        res.status(500).send(e)
    }
}

async function httpRenderDocDashboard(req, res) {

    try {
        const today = moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString();

        const doctor_id = req.user._id

        const totalPats = await Patient.countDocuments({
            doctor: doctor_id,
        });

        // const pats = await Appointment.find({ doctor: doctor_id })
        const totalAppointments = await Appointment.countDocuments({
            appointmentDate: {
                $gte: today,
                $lt: moment(today).endOf('day').toISOString()
            },
            doctor: doctor_id
        });

        // console.log(totalAppointments)


        let isDoc;
        if (req.user.role === "DOCTOR") {
            isDoc = true;
        }

        res.render("dashboard.doc.hbs", { isDoc, dname: req.user.name, totalAppointments, totalPats, page: "DOCTOR DASHBOARD" })

        // console.log(req)



    } catch (e) {
        res.status(500).send(e)
    }
}

async function httpRenderHome(req, res) {
    try {


        res.render("index.hbs", { page: "HOME" })

        // console.log(req)



    } catch (e) {
        res.status(500).send(e)
    }
}
// TODO: TWO DASHBOARDS PATIENT AND DOCTOR


module.exports = { httpRenderDocDashboard, httpRenderPatDashboard, httpRenderHome }