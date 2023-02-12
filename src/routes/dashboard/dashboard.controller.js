const axios = require("axios")
//this is the dashboard controller

async function httpRenderDashboard(req,res){
    
    try{
       
        res.render("index.hbs")
        
        // console.log(req)



    }catch(e){
        res.status(500).send(e)
    }
}




module.exports = {httpRenderDashboard}