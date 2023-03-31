const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


function connection() {
    const username = process.env.DB_USERNAME
        // const password = process.env.DB_PASSWORD
        // const cluster = process.env.CLUSTER
        // const dbname = process.env.DB_NAME


    const password = process.env.DB_PASSWORD
    const cluster = process.env.CLUSTER
    const dbname = process.env.DB_NAME

    mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`);


    // mongoose.connect("mongodb://127.0.0.1:27017/telemed");
}





module.exports = { connection };