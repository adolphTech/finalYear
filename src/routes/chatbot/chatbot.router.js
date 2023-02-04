const express = require("express");
require("dotenv").config()



const {httpRenderChatbot,httpDialogflowFullfilment}= require("./chatbot.controller");


const chatBotRouter = express.Router();

chatBotRouter.get("/",httpRenderChatbot);
// chatBotRouter.post("/fullfillment",httpDialogflowFullfilment)

chatBotRouter.post("/dialogflow-fulfillment", (request, response) => {
    httpDialogflowFullfilment(request, response);
  });

module.exports = chatBotRouter;