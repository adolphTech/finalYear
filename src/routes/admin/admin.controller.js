const axios = require("axios")

const Doctor = require("../../models/users/doc/docs.model");
const Doc = require("../../models/users/doc/docs.model");


async function httpAllDocs(req, res) {
    try {
        const doctors = await Doc.find({ role: "DOCTOR" })

        res.send(doctors)

    } catch (e) {
        console.log(e)
    }
}

async function renderDoctors(req, res) {

    try {
        const docsArr = await axios.get(`${process.env.DOMAIN}/admin/all`)
        const doctors = docsArr.data
            // res.send(doctors)

        res.render("adminManage.hbs", { doctors })
        console.log(doctors)

    } catch (e) {
        console.log(e)
    }
}

async function renderAdmin(req, res) {
    try {

        const totalDocs = await Doctor.countDocuments({});

        res.render("admin.hbs", { page: "ADMIN", isAdmin, role: req.user.role, totalDocs })


    } catch (e) {
        console.log(e)
    }
}

module.exports = { httpAllDocs, renderDoctors, renderAdmin }