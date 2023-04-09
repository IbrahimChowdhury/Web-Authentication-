let mongoose=require("mongoose")

let usersSchema= mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})


module.exports= mongoose.model("usersData",usersSchema)