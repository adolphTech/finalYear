const bcrypt = require("bcryptjs");
const passportDoctor = require("passport");

const Doc = require("../../../models/users/doc/docs.model");
const User = require("../../../models/users/patients/patients.model");

// pages to render
async function renderLoginPage(req, res) {
  res.render("doc.login.hbs");
}

// register
async function renderRegisterPage(req, res) {
  res.render("doc.register.hbs");
}

// register a new patient
async function renderPatientRegisterPage(req, res) {
  // console.log(req.user.role)
  if (req.user.role === "DOCTOR") {
    res.render("patient.register.hbs");
  } else {
    req.flash("error_msg", "You are not allowed to perform that action");
    res.redirect("/");
  }
}

//register handler
async function httpRegisterPatient(req, res) {
  console.log(req.body);
  // return;
  const { name, email, password, password2, contact, dob, gender } = req.body;
  let errors = [];

  //check required fields
  if (
    !name ||
    !email ||
    !password ||
    !password2 ||
    !contact ||
    !dob ||
    !gender
  ) {
    errors.push({ msg: "please fill in all fields" });
  }

  //check password match
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  //check password length
  if (password.length < 6) {
    errors.push({ msg: "password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("patient.register.hbs", {
      errors,
      name,
      email,
      password,
      password2,
      contact,
      dob,
      gender,
    });
  } else {
    //validation passed
    User.findOne({ email }).then((user) => {
      if (user) {
        //use exists
        errors.push({ msg: "Email is already registered" });
        res.render("patient.register", {
          errors,
          name,
          email,
          password,
          password2,
          contact,
          dob,
          gender,
        });
      } else {
        const doctor = req.user.name;

        //generate patient  ID
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const digits = "0123456789";

        function generatePatientID() {
          let id = letters.charAt(Math.floor(Math.random() * letters.length));

          for (let i = 0; i < 5; i++) {
            id += digits.charAt(Math.floor(Math.random() * digits.length));
          }

          return id;
        }
        const patientId = generatePatientID()

        const newUser = new User({
          name,
          email,
          password,
          contact,
          doctor,
          dob,
          gender,
          patientId,
        });

        // hash password
        bcrypt.genSalt(8, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //set password to hash
            newUser.password = hash;

            //   save user
            newUser
              .save()

              .then((user) => {
                console.log(user);
                req.flash(
                  "success_msg",
                  "User Registered successfully"
                );
                res.redirect("/");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
}

//////////////////////////////////////////////////////////////////////////

//register handler
async function httpUserRegister(req, res) {
  const { name, email, password, password2, regNumber, phone, hospital } =
    req.body;
  let errors = [];

  //check required fields
  if (
    !name ||
    !email ||
    !password ||
    !password2 ||
    !regNumber ||
    !phone ||
    !hospital
  ) {
    errors.push({ msg: "please fill in all fields" });
  }

  //check password match
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  //check password length
  if (password.length < 6) {
    errors.push({ msg: "password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      regNumber,
      phone,
      hospital,
    });
  } else {
    //validation passed
    Doc.findOne({ email }).then((user) => {
      if (user) {
        //use exists
        errors.push({ msg: "Email is already registered" });
        res.render("doc.register", {
          errors,
          name,
          email,
          password,
          password2,
          regNumber,
          phone,
          hospital,
        });
      } else {
        const newUser = new Doc({
          name,
          email,
          password,
          hospital,
          regNumber,
          phone,
        });

        // hash password
        bcrypt.genSalt(8, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //set password to hash
            newUser.password = hash;

            //   save user
            newUser
              .save()

              .then((user) => {
                console.log(user);
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("docs/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
}

//login handle

// async function httpUserLogin(req,res,next){

// passport.authenticate("local",{
//    successRedirect: "/",
//    failureRedirect : "/docs/login",
//    failureFlash :true
// })(req,res,next);
// };

async function httpUserLogin(req, res, next) {
  passportDoctor.authenticate("doctor", {
    successRedirect: "/",
    failureRedirect: "/docs/login",
    failureFlash: true,
  })(req, res, next);
}

//logout handle
async function httpUserLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success_msg", "You are logged out");
    res.redirect("/docs/login");
  });
}

// TODO :Make users logout according to role
async function httpMyAccount(req, res) {
  console.log(req.user);
  const name = req.user.name;
  const email = req.user.email;
  const dateJoined = req.user.date;
  res.render("myAccount.hbs", { name, email, dateJoined });
}

// async function

module.exports = {
  renderLoginPage,
  renderRegisterPage,
  httpUserRegister,
  httpUserLogin,
  httpUserLogout,
  httpMyAccount,
  httpRegisterPatient,
  renderPatientRegisterPage,
};
