const express = require("express");



const { ensureAuthenticated } = require("../../middlewares/auth")

const { httpTwilio, renderMeeting, sendMail, sendSms } = require("./meeting.controller");

const meetingRouter = express.Router();

meetingRouter.post("/", httpTwilio);
meetingRouter.get("/", ensureAuthenticated, renderMeeting)
meetingRouter.post("/mail", sendMail)
meetingRouter.post("/sms", sendSms)


module.exports = meetingRouter;