const express = require("express");

const {ensureAuthenticated} = require("../../../middlewares/auth")

const {
    renderLoginPage,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,

} = require("./patients.controller")


const usersRouter = express.Router();

// pages

usersRouter.get("/me",ensureAuthenticated,httpMyAccount)


usersRouter.get("/login",renderLoginPage);


usersRouter.post("/login",httpUserLogin);
usersRouter.get("/logout",httpUserLogout);



module.exports = usersRouter