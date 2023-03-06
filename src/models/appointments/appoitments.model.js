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
  appointmentTime:{
    type:String,
    required:true

  },

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  mode:{
    type:String,
    required:true,
    default:"online"

  }
});

const Appointment = mongoose.model("Appointment", appointmentsSchema);

module.exports = Appointment;
