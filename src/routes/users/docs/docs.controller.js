const bcrypt = require("bcryptjs");
const passportDoctor = require("passport");

const Doc = require("../../../models/users/doc/docs.model");
const User = require("../../../models/users/patients/patients.model");


// api 
// todo:error for no pdoc

// fetches only patients for a specific doctor

async function httpAllpatientsForDoc(req, res) {
    try {

        if (!req.query.doc) {

            res.send("user is equired for this")

        } else {
            const doc = req.query.doc
                // console.log(doc)

            const patients = await User.find({ doctor: doc })
                .populate('doctor')
                .exec();
            res.send(patients)



        }




    } catch (e) {
        console.log(e)
    }
}





// api ---end


// pages to render
async function renderLoginPage(req, res) {
    res.render("doc.login.hbs");
}



// register
async function renderRegisterPage(req, res) {
    let isDoc;
    if (req.user.role === "DOCTOR") {
        isDoc = true;
    } else {
        isDoc = false;
    }
    res.render("doc.register.hbs", { isDoc, page: "REGISTER DOCTOR" });
}
// todo : patients restict routes 
// register a new patient
async function renderPatientRegisterPage(req, res) {
    // console.log(req.user.role)
    let isDoc;
    if (req.user.role === "DOCTOR") {


        isDoc = true
    } else {
        isDoc = false;
    }
    res.render("patient.register.hbs", { isDoc, page: "REGISTER PATIENT" });
}


//register handler
async function httpRegisterPatient(req, res) {

    const doctor_id = req.user._id
    console.log(doctor_id)

    const { name, email, password, contact, dob, gender } = req.body;
    let errors = [];

    //check required fields
    if (!name ||
        !email ||
        !password ||
        !contact ||
        !dob ||
        !gender
    ) {
        errors.push({ msg: "please fill in all fields" });
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
            contact,
            dob,
            gender,
        });
    } else {
        //validation passed
        User.findOne({ email }).then(async(user) => {
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


                // //generate patient  ID

                const SYSTEM_NAME = 'TL';

                const patientCount = await User.countDocuments({});

                function generatePatientId() {
                    let newPatientRegistrationNumber = patientCount + 1;
                    return `${SYSTEM_NAME}PAT${String(newPatientRegistrationNumber).padStart(4, '0')}`;
                }

                const patientId = generatePatientId();


                const newUser = new User({
                    name,
                    email,
                    password,
                    contact,
                    doctor: doctor_id,
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
                                res.redirect("/doctor");
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
}

// todo : admin routes
//////////////////////////////////////////////////////////////////////////

//register handler
async function httpUserRegister(req, res) {
    const { name, email, password, password2, phone, hospital } =
    req.body;
    let errors = [];

    const SYSTEM_NAME = 'TL';

    const doctorsCount = await Doc.countDocuments({

    });

    function generateDoctorRegistrationNumber() {
        let newDoctorRegistrationNumber = doctorsCount + 1;
        return `${SYSTEM_NAME}DR${String(newDoctorRegistrationNumber).padStart(4, '0')}`;
    }

    const regNumber = generateDoctorRegistrationNumber();


    // console.log(doctorsCount)

    //check required fields
    if (!name ||
        !email ||
        !password ||
        !password2 ||
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
                                res.redirect("/docs/login");
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
}

//login handle


// async function httpUserLogin(req, res, next) {
//     console.log(req)

//     passportDoctor.authenticate("doctor", {



//         // redirect the user to the specified URL;
//         successRedirect: "/doctor",
//         failureRedirect: "/docs/login",
//         failureFlash: true,
//     })(req, res, next);
// }

async function httpUserLogin(req, res, next) {
    passportDoctor.authenticate("doctor", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (!user) {
            return res.redirect("/docs/login");
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            // Check user role and redirect accordingly
            if (req.user.role === "ADMIN") {
                return res.redirect("/admin/dashboard");
            } else if (req.user.role === "DOCTOR") {
                return res.redirect("/doctor");
            } else {
                return res.redirect("/");
            }
        });
    })(req, res, next);
}




// async function httpUserLogin(req, res, next) {
//     passportDoctor.authenticate("doctor", {
//         successRedirect: (req, res) => {
//             if (req.user.role === "ADMIN") {
//                 return "/admin";
//             } else if (req.user.role === "DOCTOR") {
//                 return "/doctor";
//             } else {
//                 return "/";
//             }
//         },
//         failureRedirect: "/docs/login",
//         failureFlash: true
//     })(req, res, next);
// }


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
    contact = req.user.phone
    const name = req.user.name;
    const email = req.user.email;
    const dateJoined = req.user.date;
    res.render("myAccount.hbs", { name, email, dateJoined, contact });
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
    httpAllpatientsForDoc,
};