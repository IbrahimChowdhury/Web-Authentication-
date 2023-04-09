let app=require("./app")
require("dotenv").config()

let mongoose=require("mongoose")
let url=process.env.DB_URL

let PORT=process.env.port || 5000


mongoose.connect(url)
.then(()=>{
    console.log("mongoDB is connected")
})
.catch(()=>{
    console.log("mongoDb is not connected")
})

app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)
})

