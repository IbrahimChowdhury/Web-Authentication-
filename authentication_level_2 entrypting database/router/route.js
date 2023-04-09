let router=require("express").Router()
let path=require("path")

// home route
router.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + "/../view/home.html"))
})


let user=require("../model/user_model")


// creating  or signup

router.post("/signup",async(req,res)=>{
    try {
      
        let new_user= user(req.body)
        await  new_user.save()
        res.status(200).json(new_user)
    } catch (error) {
        res.status(404).json({message:"user not entered"})
    }
})


// signin

router.post("/signin",async(req,res)=>{
    try {
        let {email,password}=req.body
        let usser=await user.findOne({email:email})
        if(usser && usser.password==password)
        {
            res.status(201).json({message:"this is a valid user "})
        }
        else
        {
            res.status(404).json({message:"invalid user"})
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})




module.exports=router
