const bcrypt = require("bcryptjs");
const passportPatient = require("passport");

// const Doc = require("../../../models/users/doc/docs.model")


// pages to render
async function renderLoginPage(req,res){
    res.render("patient.login.hbs")
}


    async function httpUserLogin(req, res, next) {
        passportPatient.authenticate("patient", {
          successRedirect: "/",
          failureRedirect: "/users/login",
          failureFlash: true
        })(req, res, next);
      }

   //logout handle
async  function httpUserLogout(req, res, next){
    req.logout((err)=>{
      if (err) { return next(err); }

      req.flash("success_msg","You are logged out");
      res.redirect('/users/login');
    });
  };


  async function httpMyAccount(req,res){
    console.log(req.user)
    const name = req.user.name;
    const email = req.user.email;
    const dateJoined= req.user.date
    res.render("myAccount.hbs",{name,email,dateJoined})
}


// async function

module.exports = {
    renderLoginPage,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,
}