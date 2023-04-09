let mongoose=require("mongoose")
let encrypt=require("mongoose-encryption")
require("dotenv").config()

var encKey = process.env.enc_key;



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
usersSchema.plugin(encrypt, {
    secret: encKey,
    encryptedFields: ['password']
   
});


let userModel=mongoose.model("level1Authentication",usersSchema)


module.exports=userModel