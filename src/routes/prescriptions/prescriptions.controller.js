const axios = require("axios");
const moment = require("moment");
const Prescription = require("../../models/prescription/prescriptions.model");
const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");
require("dotenv").config();

// todo : add date to presc
// todo: pat and doc
// todo :doctor from req.user
// todo: pat from pat id
// todo : email the prescription
// todo: chage to prec date, reg date ...
async function addPrescription(req, res) {
    try {
        console.log(req.body);
        const { medication, patientId, description } = req.body;

        const doctor_id = req.user._id;

        const patientData = await Patient.find({ patientId });

        const patient = patientData[0]._id;

        const newPrescription = new Prescription({
            medication,
            doctor: doctor_id,
            description,
            patient,
        });


        await newPrescription.save()

        console.log(newPrescription)

        req.flash("success_msg", "Prescription successfull");
        res.redirect("/manage");
    } catch (e) {
        console.log(e);

        req.flash("error_msg", "Prescription failed");
        res.redirect("/manage");
    }
}

async function httpRenderPatientPrescription(req, res) {
    try {
        const pat_id = req.user._id.toString();

        const prescriptionsArr = await axios.get(
            `${process.env.DOMAIN}/presc?patient=${pat_id}`
        );
        // const prescriptions = prescriptionsArr.data;
        // console.log(prescriptions);

        const prescriptionsUn = prescriptionsArr.data
            // console.log(appointments)

        const prescriptions = prescriptionsUn.map(prescription => {

            const prescriptionDate = moment.utc(prescription.date);
            const formattedDate = prescriptionDate.format('M/D/YY');

            return {...prescription,
                prescriptionDate: formattedDate,
            };
        });

        let isDoc;
        if (req.user.role === "DOCTOR") {
            isDoc = true;
        } else {
            isDoc = false;
        }


        res.render("pat.prescriptions.hbs", { prescriptions, isDoc, page: "PATIENT PRESCRIPTIONS" });
    } catch (e) {
        console.log(e);
    }
}

async function httpFetchPrescriptions(req, res) {
    // TODO : the doctor ID is on the logins side

    try {
        if (!req.query.patient) {
            // todo : --- error if not id
            res.send("missing parameters");
        } else {
            const patient = req.query.patient;
            const prescription = await Prescription.find({ patient })
                .populate("patient")
                .populate("doctor")
                .exec();

            res.send(prescription);
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports = {
    addPrescription,
    httpFetchPrescriptions,
    httpRenderPatientPrescription,
};

// TODO: DOCTOR SEE THE PRESCRIPTIONS THEY MADE