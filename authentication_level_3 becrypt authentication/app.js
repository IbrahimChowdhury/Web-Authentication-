// bcrypt authentication

let express = require("express")
let app = express()
let cors = require("cors")
let usersModel = require("./model/userModel")

// requiring bcrypt authentication system
const bcrypt = require('bcrypt');
const saltRounds = 10;


require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/home.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/view/register.html")
})



app.post("/register", async (req, res) => {
    try {

        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            let { username,email, password } = req.body
            let newUser = usersModel({
                username: username,
                email:email,
                password: hash
            })

            await newUser.save()
            res.redirect("/login")
        });

    } catch (error) {
        res.status(404).json(error)
    }
})


// login : get
app.get("/login",  (req, res) => {
    res.sendFile(__dirname + "/view/login.html")
});


app.post("/login",async(req,res)=>{
    try {

        let {username,password}=req.body
        let findUser=await usersModel.findOne({username:username})
        if(findUser)
        {
            bcrypt.compare(req.body.password, findUser.password, function(err, result) {
                // result == true
                if(result==true){
                    res.status(202).json(findUser)
                }
                else{
                    res.send("wrong pasword")
                }
            });
        }
        else{
            res.status(404).send("user cannot found")
        }

    } catch (error) {
        res.status(505).send(error)
    }
})

app.get("/profile",(req,res)=>{
    res.sendFile(__dirname + "/view/profile.html")
})

module.exports = app
