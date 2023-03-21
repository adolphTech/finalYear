const express = require("express");



const { ensureAuthenticated, ensurePatientAuthenticated } = require("../../middlewares/auth")


const { addPrescription, httpFetchPrescriptions, httpRenderPatientPrescription } = require("./prescriptions.controller");


const prescriptionRouter = express.Router();

prescriptionRouter.post("/", addPrescription);
prescriptionRouter.get("/", httpFetchPrescriptions);
prescriptionRouter.get("/pat", ensureAuthenticated, ensurePatientAuthenticated, httpRenderPatientPrescription);





module.exports = prescriptionRouter;