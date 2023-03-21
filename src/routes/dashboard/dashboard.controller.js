const axios = require("axios")
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
        let isDoc;
        if (req.user.role === "DOCTOR") {
            isDoc = true;
        }

        res.render("dashboard.doc.hbs", { isDoc, page: "DOCTOR DASHBOARD" })

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