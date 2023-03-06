const express = require("express");



const {ensureAuthenticated} = require("../../middlewares/auth")


const {addPrescription,} = require("./prescriptions.controller");


const prescriptionRouter = express.Router();

prescriptionRouter.post("/",addPrescription);




module.exports = prescriptionRouter;