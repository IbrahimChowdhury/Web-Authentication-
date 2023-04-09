let mongoose=require("mongoose")
require("dotenv").config()
let url=process.env.db_url

module.exports=  mongoose.connect(url)
.then(()=>{
    console.log("mongoDB is connected ")
})
.catch(()=>{
    console.log("mongoDB is not connected")
})
