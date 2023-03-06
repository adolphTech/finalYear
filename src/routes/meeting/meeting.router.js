const express = require("express");



const {ensureAuthenticated} = require("../../middlewares/auth")

const {httpTwilio, renderMeeting} = require("./meeting.controller");

const meetingRouter = express.Router();

meetingRouter.post("/",httpTwilio);
meetingRouter.get("/",renderMeeting)

module.exports = meetingRouter;