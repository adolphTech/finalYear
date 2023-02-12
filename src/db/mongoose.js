const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


 function connection(){
    // const username = "adolph";
    // const password = "8893";
    // const cluster = "cluster0.sk2qvsa";
    // const dbname = "ictWorkshop";
    
    // mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`);
    
    
    mongoose.connect("mongodb://127.0.0.1:27017/telemed");
}





module.exports = {connection};

