const express = require("express");



const { ensureAuthenticated, ensureDoctorAuthenticated } = require("../../middlewares/auth")


const { httpRenderPats, } = require("./manage.controller");


const patManageRouter = express.Router();

patManageRouter.get("/", ensureAuthenticated, ensureDoctorAuthenticated, httpRenderPats);




module.exports = patManageRouter;