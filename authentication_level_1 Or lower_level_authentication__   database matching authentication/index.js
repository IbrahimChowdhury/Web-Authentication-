const express=require("express")
let app=express()
let cors=require("cors")
const router = require("./router/route")
app.use(cors())
require("dotenv").config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())


let port=process.env.PORT || 4000


// connecting db
require("./connectDB/connectDB")

app.use(router)

//router error 
app.use((req,res,next)=>{
    res.status(404).json({message:"route not found"})
})


// server error
app.use((err,req,res,next)=>{
    res.status(500).json({message:"server error"})
})



// server running
app.listen(port,()=>{
    console.log(`your server is running at http://localhost:${port}`)
})