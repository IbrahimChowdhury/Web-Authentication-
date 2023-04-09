let mongoose=require("mongoose")
require("dotenv").config()
let db_url=process.env.DB_url

module.exports= mongoose.connect(db_url)
.then(()=>{
    console.log("mongoDB is connected")
})
.catch(()=>{
    console.log("mongoDB is not connected")
})






