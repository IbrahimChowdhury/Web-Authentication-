let mongoose=require("mongoose")

require("dotenv").config()
let usersSchema= mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})



let userModel= mongoose.model("usersInfo_for_practice",usersSchema)

module.exports=userModel