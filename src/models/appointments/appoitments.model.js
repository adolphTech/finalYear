const mongoose = require("mongoose");


// TODO: MOMENT JS -- DATE.TIME ,DAY OF WEEK
const appointmentsSchema = new mongoose.Schema({
  appointmentNumber: {
    type: Number,
    required: true,
    trim: true,
  },

  appointmentDate:{
    type:Date,
    required:true,

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
  mode:{
    type:String,
    required:true,
  }
});

const Appointment = mongoose.model("Appointment", appointmentsSchema);

module.exports = Appointment;
