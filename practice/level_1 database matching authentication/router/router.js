let router=require("express").Router()
let path=require("path")
const { find } = require("../model/schema_model")
let users=require("../model/schema_model")
let ejs=require("ejs")
const { Router } = require("express")



// register section
router.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname + "/../view/register.html"))
})


router.post("/register",async(req,res)=>{
    try {
       
        let name=req.body.name
        let email=req.body.email
        let password=req.body.password
        let nUser=await users.findOne({email:email})
        if(nUser)
        {
            res.sendFile(path.join(__dirname + "/../view/user_exist.html"))
        }
        else{
            let newUser= users({
                name:name,
                email:email,
                password:password
              })
               newUser.save()
             res.render("register_successfull",{
                name:name,
                email:email,
                password:password
             })
        }


    } catch (error) {
        res.status(404).json({message:error.message})
    }        
})



// login section

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname + "/../view/login.html"))
})



router.post("/login", async(req,res)=>{
    try {
        let {email,password}=req.body
        let find_user = await users.findOne({email:email})
        if(find_user && find_user.password==password)
        {
         
            res.redirect("/loginHome")
         
        }
        else
        {
            res.status(404).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).json({message:"something is wrong "})
    }
})







router.get("/loginHome",(req,res)=>{
        users.find({},(err,usr)=>{
            res.render("login_successful",{
                users:usr
            })
        })
})













module.exports=router