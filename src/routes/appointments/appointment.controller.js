const axios = require("axios");
const moment = require('moment');
const Appointment = require("../../models/appointments/appoitments.model");
const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");
require("dotenv").config();

// TODO:DEFAULT SHOW 5 DOCS ON DATA TABLE
async function httpRenderDoctorsAppointments(req, res) {
    try {

        let isDoc;
        if (req.user.role === "DOCTOR") {

            isDoc = true
        } else {
            isDoc = false;
        }
        // TODO : MOMENT JS  && url change 
        const doc_id = req.user._id.toString();

        const appointmentsArr = await axios.get(`${process.env.DOMAIN}/appointments?doc=${doc_id}`)
        const appointmentsUn = appointmentsArr.data
            // console.log(appointments)

        const appointments = appointmentsUn.map(appointment => {
            const appointmentDate = moment.utc(appointment.appointmentDate);
            const formattedDate = appointmentDate.format('ddd : M/D/YY');
            const formattedTime = appointmentDate.format('h:mm A');
            return {...appointment,
                appointmentDate: formattedDate,
                appointmentTime: formattedTime,
            };
        });
        // console.log(appointments )

        res.render("appointment.hbs", { appointments, isDoc, page: "DOC APPOINTMENTS" })





    } catch (e) {
        console.log(e)
    }

}

async function httpRenderPatientAppointments(req, res) {
    try {
        let isDoc;

        if (req.user.role === "DOCTOR") {

            isDoc = true
        } else {
            isDoc = false;
        }
        const pat_id = req.user._id.toString();

        const appointmentsArr = await axios.get(`${process.env.DOMAIN}/appointments/pat?patient=${pat_id}`);
        const appointments = appointmentsArr.data
            //  console.log(data)

        //  res.send(data)



        res.render("pat.appointments.hbs", { appointments, isDoc, page: "PATIENT APPOINTMENTS" })

    } catch (e) {
        console.log(e)
    }

}

// todo: make appointment id to be 5 digits

// async function httpAddAppointment(req, res) {

//   try {
//     // const doctor_id = req.user.id;
//     const doctor_id = "63e8b36fd60ae343737f85af";
//     // const patient_id = "63e95206fc0f609601c638d4";
//     const patient_id ="63ee024db00d558eed83e5a4"

//     const appointmentCount = await Appointment.countDocuments({
//       doctor: doctor_id,
//     });
//     const { date, time } = req.body;
//     const appointmentDate = new Date(date);

//     const newAppointment = new Appointment({
//       appointmentNumber: appointmentCount + 1,
//       appointmentDate,
//       patient: patient_id,
//       appointmentTime: time,
//     });

//     console.log(newAppointment);

//     await newAppointment.save();
//     res.status(201).send(newAppointment);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// }

async function httpAddAppointment(req, res) {
    try {
        const doctor_id = req.user._id;
        const userInputDate = req.body.date;
        const userInputTime = req.body.time;
        const mode = req.body.mode;

        const patientId = req.body.patientId

        // combine the date and time strings into a single ISO string
        const isoString = `${userInputDate}T${userInputTime}`;

        // create a new Date object from the ISO string
        const jsDate = new Date(isoString);

        // verify that the Date object was created successfully
        if (isNaN(jsDate.getTime())) {
            req.flash("error_msg", "Invalid date format");
            res.redirect('/manage');

            return;
        }

        const patientData = await Patient.find({ patientId })

        // console.log(patientData[0]._id)

        const patient = patientData[0]._id //getting the id of the patient from db

        const appointmentCount = await Appointment.countDocuments({
            doctor: doctor_id,
        });

        console.log({
            appointmentDate: jsDate,
            doctor: doctor_id,
            appointmentNumber: appointmentCount,
            mode,
            patient
        })

        const newAppointment = new Appointment({
            appointmentDate: jsDate,
            doctor: doctor_id,
            appointmentNumber: appointmentCount,
            mode,
            patient
        })

        await newAppointment.save()


        //  console.log(newAppointment)
        await axios.post(`${process.env.DOMAIN}/meeting/mail`, {
                to: "adolphjohn0@gmail.com",
                subject: "Appointment Scheduled",
                text: `Hello ${patientData[0].name} Dr.${req.user.name} has scheduled an appointment on ${userInputDate} at ${userInputTime} ${mode}`
            })
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })


        req.flash("success_msg", "Appointment schedule successfull");
        res.redirect('/manage');

    } catch (e) {
        console.log(e)

        req.flash("error_msg", "Appointment schedule failed");
        res.redirect('/manage');
    }

}

async function httpFetchAppointment(req, res) {
    // TODO : the doctor ID is on the logins side
    // Todo: patients id should be the selected patient from the datatable;

    try {

        if (!req.query.doc) {
            // todo : --- error if not id
            res.send("missing parameters")

        } else {
            const doctor = req.query.doc;
            const appointments = await Appointment.find({ doctor })
                .populate('patient')
                .populate('doctor')
                .exec();

            res.send(appointments);
        }


    } catch (e) {
        console.log(e)
    }
}

async function httpFetchSpecPatientAppointment(req, res) {

    // const patient = "63ee024db00d558eed83e5a4"
    try {

        if (!req.query.patient) {

            res.send("user is equired for this")

        } else {
            const patient = req.query.patient
            const appointments = await Appointment.find({ patient })
                .populate('patient')
                .populate('doctor')
                .exec();

            res.send(appointments);

        }



    } catch (e) {
        console.log(e)
    }

}

module.exports = { httpAddAppointment, httpFetchAppointment, httpRenderPatientAppointments, httpFetchSpecPatientAppointment, httpRenderDoctorsAppointments };