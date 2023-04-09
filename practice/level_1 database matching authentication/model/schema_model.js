let mongoose =require("mongoose")

let newUser= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    }

})


module.exports=mongoose.model("User_DB",newUser) 