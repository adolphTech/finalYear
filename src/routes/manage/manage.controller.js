const axios = require("axios");
const Appointment = require("../../models/appointments/appoitments.model");
const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");

// todo: make this link to api ----

async function httpRenderPats(req, res) {
    try {


        const doc_id = req.user._id.toString();
        const patientsArr = await axios.get(`${process.env.DOMAIN}/docs/pats?doc=${doc_id}`)
        const patients = patientsArr.data

        let isDoc;
        if (req.user.role === "DOCTOR") {
            isDoc = true;
        } else {
            isDoc = false;
        }


        res.render("pats.hbs", { patients, isDoc, page: "MANAGE PATIENTS" })
            //    console.log(patients)


        // res.send(patients.data)

    } catch (e) {
        console.log(e)
    }
}




module.exports = { httpRenderPats }