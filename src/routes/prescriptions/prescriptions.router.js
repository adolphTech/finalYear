const express = require("express");



const {ensureAuthenticated} = require("../../middlewares/auth")


const {httpRenderPrescDoc,}= require("./prescriptions.controller");


const prescriptionRouter = express.Router();

prescriptionRouter.get("/doc",httpRenderPrescDoc);




module.exports = prescriptionRouter;