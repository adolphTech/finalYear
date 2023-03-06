
async function addPrescription(req,res){
    try{
        console.log(req.body)
        req.flash("success_msg","Prescription successfull");
         res.redirect('/manage');

    }catch(e){
        console.log(e)
    }


}

module.exports = {addPrescription};