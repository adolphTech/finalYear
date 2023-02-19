const axios = require("axios")
const Appointment = require("../../models/appointments/appoitments.model");
const Doctor = require("../../models/users/doc/docs.model");
const Patient = require("../../models/users/patients/patients.model");


async function httpRenderPrescDoc(req,res){
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




module.exports = {httpRenderPrescDoc}