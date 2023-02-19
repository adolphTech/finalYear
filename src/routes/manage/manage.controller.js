//this is the dashboard controller

async function httpRenderAllPats(req,res){
    
    try{
       
        res.render("doc.prescriptions.hbs")
        
        // console.log(req)



    }catch(e){
        res.status(500).send(e)
    }
}




module.exports = {httpRenderAllPats}