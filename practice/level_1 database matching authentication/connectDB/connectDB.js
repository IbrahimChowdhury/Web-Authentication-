require("dotenv").config()
let mongoose=require("mongoose")
let url=process.env.Db_URL


mongoose.set('strictQuery', true)
 mongoose.connect(url)
.then(()=>{
    console.log("mongoDB is connected")
})
.catch((error)=>{
    console.log(error)
})


