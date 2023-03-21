require("dotenv").config()
const http =require("http")

const app = require("./app")

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const {connection} = require("./db/mongoose")



server.listen(PORT,async()=>{
    // console.log(`server has started on ${PORT}`)
    let startTime = performance.now();
   await connection();
   let endTime = performance.now();
   

   const timeTakenToConnectDb = Math.floor(endTime - startTime)

    console.log(`server is listening on port ${PORT} and it took ${timeTakenToConnectDb} seconds to connect to the db`)
})



// TODO: create my profile --patient can update their data