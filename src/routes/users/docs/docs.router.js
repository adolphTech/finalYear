const express = require("express");

const {ensureAuthenticated} = require("../../../middlewares/auth")

const {
    renderLoginPage,
    renderRegisterPage,
    httpUserRegister,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,
    renderPatientRegisterPage,
    httpRegisterPatient

} = require("./docs.controller")


const docsRouter = express.Router();

// pages

docsRouter.get("/me",ensureAuthenticated,httpMyAccount)


docsRouter.get("/login",renderLoginPage);
docsRouter.get("/register",renderRegisterPage);
// 
docsRouter.get("/addPat",ensureAuthenticated,renderPatientRegisterPage)
docsRouter.post("/addPat",ensureAuthenticated,httpRegisterPatient)
// 

docsRouter.post("/register",httpUserRegister);

docsRouter.post("/login",httpUserLogin);
docsRouter.get("/logout",httpUserLogout);



module.exports = docsRouter