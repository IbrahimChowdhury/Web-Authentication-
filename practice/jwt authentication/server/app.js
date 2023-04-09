let express=require("express")
let app=express()
let cors=require("cors")
let jwt=require("jsonwebtoken")
let userModel=require("./userModel")
require("dotenv").config()
let passport=require("passport")

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(passport.initialize())

app.get("/",(req,res)=>{
    res.send("HOme page")
})

app.post("/register",async(req,res)=>{
    try {
        
        let {username,password}=req.body
        let newUser= userModel({
            username:username,
            password:password
        })
         await newUser.save()
        res.status(202).send(newUser)

         
       

    } catch (error) {
        res.status(404).send(error)
    }
})

app.post("/login",async(req,res)=>{
    let user=await userModel({username:req.body.username})

  let payload={
            id:user._id,
            username:user.username
         }
      let token=jwt.sign(payload,process.env.key,{
        expiresIn:"2d",
      })

       return res.status(202).send({
            msg:"user login successfully",
            token:"Bearer "+token
        })
        // localStorage.setItem("token", "Bearer "+token);

})


module.exports=app