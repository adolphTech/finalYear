const axios = require("axios")
const Appointment = require("../../models/appointments/appoitments.model");
// const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");


async function httpRenderDoctorsAppointments(req,res){
    try{
      // TODO : MOMENT JS 
        const appointmentsArr =await axios.get("http://localhost:3000/appointments")
        const appointments= appointmentsArr.data

      

        res.render("appointment.hbs",{appointments})

    }catch(e){
        console.log(e)
    }

  }

async function httpRenderPatientAppointments(req,res){
  try{
     
       const pat_id = req.user._id.toString();

      const appointmentsArr =await axios.get(`http://localhost:3000/appointments/pat?patient=${pat_id}`);
      const appointments = appointmentsArr.data
      //  console.log(data)
      
      //  res.send(data)
    

      res.render("pat.appointments.hbs",{appointments})

  }catch(e){
      console.log(e)
  }

}
// TODO:ADD PHYSICAL AND ONLINE MODE on appointment
async function httpAddAppointment(req, res) {
    // todo : doctors id from user.id
    // todo : patients from the selected 
    // todo: make appointment id to be 5 digits
  try {
    // const doctor_id = req.user.id;
    const doctor_id = "63e8b36fd60ae343737f85af";
    // const patient_id = "63e95206fc0f609601c638d4";
    const patient_id ="63ee024db00d558eed83e5a4"

    const appointmentCount = await Appointment.countDocuments({
      doctor: doctor_id,
    });
    const { date, time } = req.body;
    const appointmentDate = new Date(date);

    const newAppointment = new Appointment({
      appointmentNumber: appointmentCount + 1,
      appointmentDate,
      patient: patient_id,
      doctor: doctor_id,
      appointmentTime: time,
    });

    console.log(newAppointment);

    await newAppointment.save();
    res.status(201).send(newAppointment);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function httpFetchAppointment(req, res) {
  // TODO : the doctor ID is on the logins side
  // Todo: patients id should be the selected patient from the datatable;

  try {
    // todo : --- this route shows only the logged in doctors appointments

    const doctor = "63e8b36fd60ae343737f85af";
    const appointments = await Appointment.find({doctor})
    .populate('patient')
    .populate('doctor')
    .exec();

    
 

    res.send(appointments);
  } catch (e) {
    console.log(e)
  }
}

async function httpFetchSpecPatientAppointment(req,res){
  
  // const patient = "63ee024db00d558eed83e5a4"
  try {
     
    if(!req.query.patient){
      
      res.send("user is equired for this")
    
    }else{
      const patient = req.query.patient
    const appointments = await Appointment.find({patient})
    .populate('patient')
    .populate('doctor')
    .exec();

    res.send(appointments);

    }
 

   
  } catch (e) {
    console.log(e)
  }

}

module.exports = { httpAddAppointment, httpFetchAppointment ,httpRenderPatientAppointments,httpFetchSpecPatientAppointment,httpRenderDoctorsAppointments};
