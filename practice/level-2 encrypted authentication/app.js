let express=require("express")
let app=express()
let cors=require("cors")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
let usersmodel=require("./Model/model")

app.get("/",(req,res)=>{
    res.send("your server is running ")
})

app.get("/registerForm",(req,res)=>{
    res.status(202).sendFile(__dirname + "/register.html")
})

app.post("/register",async(req,res)=>{
    try {
        
        let {name,email,password}=req.body

        let newUser= usersmodel({
            name:name,
            email:email,
            password:password
        })
        await newUser.save()
        res.status(202).json({newUser})
    } catch (error) {
        res.status(404).json({msg:"data connot be send"})
    }
})

app.get("/loginForm",(req,res)=>{
    res.status(202).sendFile(__dirname + "/login.html")
})

app.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let user=await usersmodel.findOne({email:email})

        if(user && user.password==password)
        {
            res.status(202).send(`user is valid`)
        }
        else{
            res.status(201).send(`user is invalid`)
        }

    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports=app