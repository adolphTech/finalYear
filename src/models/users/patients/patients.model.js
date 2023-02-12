const mongoose = require("mongoose");
const validator = require("validator");

// TODO: make contact a tel
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid ");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot contain'password' ");
      }
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
    default: "PATIENT",
  },
  doctor: {
    type: String,
    required: true,
  },
  dob:{
    type:Date,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  patientId:{
    type:String,
    required:true

  }

 
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
