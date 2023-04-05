// module.exports = {
//     ensureAuthenticated: function(req, res, next) {
//         if (req.isAuthenticated()) {
//             return next();
//         }

//         req.flash("error_msg", "please log in");
//         res.redirect("/docs/login");
//     }
// }


// auth.js

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in');
        res.redirect('/');
    },

    // ensureDoctorAuthenticated: function(req, res, next) {
    //     if (req.isAuthenticated() && req.user.role === 'DOCTOR') {
    //         return next();
    //     }
    //     req.flash('error_msg', 'You are not authorized to access this page');
    //     res.redirect('/');
    // },

    ensureDoctorAuthenticated: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'DOCTOR') {
            return next();
        }
        req.flash('error_msg', 'You are not authorized to access this page');
        res.redirect('/');
    },

    ensureAdminAuthenticated: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'ADMIN') {
            return next();
        }
        req.flash('error_msg', 'You are not authorized to access this page');
        res.redirect('/');
    },

    ensurePatientAuthenticated: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'PATIENT') {
            return next();
        }
        req.flash('error_msg', 'You are not authorized to access this page');
        res.redirect('/');
    },






    ensureSuperAdminAuthenticated: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'superadmin') {
            return next();
        }
        req.flash('error_msg', 'You are not authorized to access this page');
        res.redirect('/');
    }
}