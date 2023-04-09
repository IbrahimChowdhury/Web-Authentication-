const { MongoDriverError } = require("mongodb")
let mongoose=require("mongoose")
let usersSchema= mongoose.Schema({
    username:{
        type:String
    },
    googleId:{
        type:String
    }
})

module.exports= mongoose.model("usersInfo",usersSchema)
