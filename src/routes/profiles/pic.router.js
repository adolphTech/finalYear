const express = require("express");
const multer = require('multer');

const { ensureAuthenticated, ensurePatientAuthenticated } = require("../../middlewares/auth")


const { multerUpload, renderProfile } = require("./pic.controller");


const picsRouter = express.Router();



const upload = multer({
    dest: "images",
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        // cb(new Error("File must be a PDF"))
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a pdf"))
        }

        cb(undefined, true)
    }
})



picsRouter.post("/avatar", ensurePatientAuthenticated, upload.single("avatar"), multerUpload, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
picsRouter.get("/profilePic", ensureAuthenticated, ensurePatientAuthenticated, renderProfile)




module.exports = picsRouter;