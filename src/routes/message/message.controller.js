
async function httpRenderMessage(req,res) {

    try{
              res.render("message.hbs")
    }catch(e){
        res.send(e)
    }
}

module.exports = {httpRenderMessage}
