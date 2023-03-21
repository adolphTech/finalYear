const express = require("express");


const {httpRenderMessage} = require("./message.controller")


// const {ensureAuthenticated} = require("../../middlewares/auth")



const messageRouter = express.Router();

messageRouter.get("/",httpRenderMessage)

module.exports = messageRouter;



