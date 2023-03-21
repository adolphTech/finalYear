const express = require("express");
require("dotenv").config()

const { ensureAuthenticated, ensurePatientAuthenticated } = require("../../middlewares/auth")

const { httpRenderChatbot, httpDialogflowFullfilment } = require("./chatbot.controller");


const chatBotRouter = express.Router();

chatBotRouter.get("/", ensureAuthenticated, ensurePatientAuthenticated, httpRenderChatbot);
// chatBotRouter.post("/fullfillment",httpDialogflowFullfilment)

chatBotRouter.post("/dialogflow-fulfillment", (request, response) => {
    httpDialogflowFullfilment(request, response);
});

module.exports = chatBotRouter;