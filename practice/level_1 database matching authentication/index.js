let express=require("express");
const router = require("./router/router");

let app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let port=4000;

app.set('view engine','ejs')

app.use(express.static("view"))

app.use(router)

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/view/home.html")
})


/* if we want to use css and html file together then we just write,

app.use(express.static("folder_name"))

now we can use html and css file together
*/

// DB connection
require("./connectDB/connectDB")





app.get("/jj",(req,res)=>{
    let user="ibrhaim"
    res.render("login_successful",{
        userList:user
    })
})


// router error 
app.use((req,res,next)=>{
    res.status(404).json({message:"router is wrong "})
})

// server error 
app.use((err,req,res,next)=>{
    res.status(500).json({message:"server error"})
})

// server 
app.listen(port,()=>{
    console.log(`your server is running at http://localhost:${port}`)
})

