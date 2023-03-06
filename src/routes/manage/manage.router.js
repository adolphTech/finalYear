const express = require("express");



const {ensureAuthenticated} = require("../../middlewares/auth")


const {httpRenderPats,}= require("./manage.controller");


const patManageRouter = express.Router();

patManageRouter.get("/",ensureAuthenticated,httpRenderPats);




module.exports = patManageRouter; 