const express = require("express");

const { ensureAuthenticated, ensureDoctorAuthenticated, ensurePatientAuthenticated } = require("../../../middlewares/auth")

const {
    renderLoginPage,
    renderRegisterPage,
    httpUserRegister,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,
    renderPatientRegisterPage,
    httpRegisterPatient,
    httpAllpatientsForDoc

} = require("./docs.controller")


const docsRouter = express.Router();

// pages

docsRouter.get("/me", ensureAuthenticated, httpMyAccount)

docsRouter.get("/pats", httpAllpatientsForDoc)


docsRouter.get("/login", renderLoginPage);
docsRouter.get("/register", ensureAuthenticated, renderRegisterPage);
// 
docsRouter.get("/addPat", ensureAuthenticated, ensureDoctorAuthenticated, renderPatientRegisterPage)
docsRouter.post("/addPat", ensureAuthenticated, httpRegisterPatient)
    // 

docsRouter.post("/register", httpUserRegister);

docsRouter.post("/login", httpUserLogin);
docsRouter.get("/logout", httpUserLogout);



module.exports = docsRouter