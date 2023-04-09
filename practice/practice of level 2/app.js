let express=require("express")
let app=express()
let usersModel=require("./userModel")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.get("/",(req,res)=>{
    res.send("good morning everyone")
})

app.get("/register",(req,res)=>{
    res.status(202).sendFile(__dirname + "/user.html")
})

app.post("/register",async(req,res)=>{
    try {
        
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
        
            let newUser= usersModel({
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
            await newUser.save()
            res.status(202).json(newUser)
    
        });
       
    } catch (error) {
        res.status(404).json({msg:"message not found"})
    }
})


app.post("/login",async(req,res)=>{
        try {
            
            let {email,password}=req.body
            let findUser= await usersModel.findOne({email:email})
            bcrypt.compare(password, findUser.password, function(err, result) {
                // result == true
                if(result==true)
                {
                    res.status(202).send(findUser)
                }
                else{
                    res.status(404).json({msg:"user not found"})
                }
            });
        } catch (error) {
            res.status(404).json({msg:"user not found"})
        }
})

module.exports=app