const express = require("express");

const { ensureAdminAuthenticated } = require("../../middlewares/auth")

const { httpAllDocs, renderDoctors, renderAdmin } = require("./admin.controller")


const adminsRouter = express.Router();

adminsRouter.get("/dashboard", ensureAdminAuthenticated, renderAdmin);
adminsRouter.get("/all", httpAllDocs);

adminsRouter.get("/manage", ensureAdminAuthenticated, renderDoctors)



module.exports = adminsRouter