let mongoose=require("mongoose")


let user_Schema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("user_info",user_Schema)



