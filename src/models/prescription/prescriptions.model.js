const mongoose = require("mongoose");


const prescSchema = new mongoose.Schema({

  description:{
    type:String,
    required:true,

  },
  medication:{
    type:String,
    required:true

  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doc',
    required:true

  },
  date:{
    type:Date,
    default:Date.now,
  }
});

const Prescription = mongoose.model("Prescription", prescSchema);

module.exports = Prescription;