require("dotenv").config()
let mongoose=require("mongoose")
let url=process.env.MONGO_URL

mongoose.set('strictQuery', true)
mongoose.connect(url)
.then(()=>{
    console.log("mongoDB is conencted")
})
.catch((error)=>{
    console.log(error.message)
})
