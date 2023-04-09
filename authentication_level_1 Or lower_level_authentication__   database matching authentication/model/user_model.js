let mongoose=require("mongoose")
let encrypt=require("mongoose-encryption")
require("dotenv").config()
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

var encKey = process.env.encrypted;

user_Schema.plugin(encrypt, { secret: encKey,  encryptedFields: ['password'] });

module.exports=mongoose.model("user_info",user_Schema)



